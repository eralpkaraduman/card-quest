import {EventDispatcher} from './EventDispatcher';
import {Deck} from './Deck';
import {DonsolCard, DonsolCardKind} from './DonsolCard';
import {Observable} from './Observable';
import {GameEvent, GameEventHistory} from './GameEventHistory';

export type CardStack = Readonly<DonsolCard[]>;
export type Shield = Readonly<DonsolCard | null>;

const NUM_CARDS_IN_ROOM = 4;
const MAX_HEALTH = 21;

export enum GameState {
  Idle = 'Idle',
  InRoom = 'InRoom',
  RoomCleared = 'RoomCleared',
  Lost = 'Lost',
  Won = 'Won',
}

export interface GameEventListener {
  onDeckUpdated?(numCards: number): void;
  onDiscardPileUpdated?(pile: CardStack): void;
  onRoomUpdated?(room: CardStack, canFlee: boolean): void;
  onStateChange?(state: GameState, canEnterRoom: boolean): void;
  onHealthChange?(health: number): void;
  onShieldChange?(shield: Shield): void;
  onHistoryUpdated?(event: GameEvent[]): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  private _room: Observable<CardStack>;
  private _discardPile: Observable<CardStack>;
  private _deck: Readonly<Deck>;
  private _state: Observable<GameState>;
  private _health: Observable<number>;
  private _shield: Observable<Shield>;
  private _history: Readonly<GameEventHistory>;

  constructor() {
    super();

    this._deck = new Deck(() => {
      this.dispatchEvent('onDeckUpdated', this.deckCount);
      if (this.deckCount <= 0 && this.health > 0) {
        this._state.update(GameState.Won);
      }
    });

    this._room = new Observable<CardStack>([], () => {
      if (this.room.length === 0 && !this.didFleeLastRoom) {
        this._state.update(GameState.RoomCleared);
      }
      this.dispatchEvent('onRoomUpdated', this.room, this.canFlee);
    });

    this._discardPile = new Observable<CardStack>([], () =>
      this.dispatchEvent('onDiscardPileUpdated', this.discardPile),
    );

    this._state = new Observable<GameState>(GameState.Idle, () => {
      this._history.add('StateChange', {state: this.state});
      this.dispatchEvent('onStateChange', this.state, this.canEnterRoom);
    });

    this._health = new Observable<number>(MAX_HEALTH, () => {
      this.dispatchEvent('onHealthChange', this.health);
      if (this.health <= 0) {
        // Dead
        this._state.update(GameState.Lost);
      }
    });

    this._shield = new Observable<Shield>(null, () => {
      this.dispatchEvent('onShieldChange', this.shield);
    });

    this._history = new GameEventHistory(() => {
      this.dispatchEvent('onHistoryUpdated', this.history);
    });
  }

  public reset(): void {
    this._deck.reset();
    this._room.reset();
    this._discardPile.reset();
    this._state.reset();
    this._health.reset();
    this._shield.reset();
    this._history.reset();
  }

  public get canEnterRoom(): boolean {
    return (
      this.state === GameState.Idle || this.state === GameState.RoomCleared
    );
  }

  public get room(): CardStack {
    return this._room.value;
  }

  public get discardPile(): CardStack {
    return this._discardPile.value;
  }

  public get deckCount(): number {
    return this._deck.count;
  }

  public get state(): GameState {
    return this._state.value;
  }

  public get health(): number {
    return this._health.value;
  }

  public get shield(): Shield {
    return this._shield.value;
  }

  public get history(): GameEvent[] {
    return this._history.history;
  }

  public get prevCardWasPotion(): boolean {
    const topCardInPile = this.discardPile.slice(-1)[0];

    return topCardInPile?.kind === DonsolCardKind.potion;
  }

  public get roomCount(): number {
    return this._history.roomCount;
  }

  private drawCards() {
    const roomCards = this._deck
      .draw(NUM_CARDS_IN_ROOM)
      .map((card, order) => new DonsolCard(card, order));
    this._state.update(GameState.InRoom);
    this._room.update(roomCards);
  }

  public advance(flee: boolean) {
    if (!flee && this.canEnterRoom) {
      this._history.add('EnterRoom', {reason: 'Clear'});
      this.drawCards();
    } else if (flee && this.canFlee) {
      this._history.add('EnterRoom', {reason: 'Flee'});
      this._deck.shuffleWithCards(this.room.map(({card}) => card));
      this._room.reset();
      this.drawCards();
    } else {
      throw "Can/'t advance";
    }
  }

  private fightMonster(card: DonsolCard) {
    const shieldValue = this.shield?.effect ?? 0;
    const totalDamage = card.effect - shieldValue;

    const shieldAbsorb = shieldValue - card.effect;
    const shieldBroke = shieldAbsorb <= 0;
    if (shieldBroke) {
      this._shield.update(null);
    }

    this._history.add('Fight', {
      card,
      totalDamage,
    });

    if (shieldValue > 0) {
      this._history.add('ShieldAbsorb', {
        damage: Math.min(shieldValue, card.effect),
        broke: shieldBroke,
      });
    }

    if (totalDamage > 0) {
      this._health.update(prevHealth => prevHealth - totalDamage);
    }
  }

  private pickShield(card: DonsolCard) {
    this._shield.update(card);
    this._history.add('PickShield', {
      card,
    });
  }

  private drinkPotion(card: DonsolCard) {
    const didGetSick = this.prevCardWasPotion;
    const health = didGetSick ? 0 : card.effect;

    if (health > 0) {
      this._health.update(prev => {
        const newHealth = prev + card.effect;
        if (newHealth > MAX_HEALTH) {
          return MAX_HEALTH;
        } else {
          return newHealth;
        }
      });
    }

    this._history.add('DrinkPotion', {health, sick: didGetSick});
  }

  public get didFleeLastRoom() {
    return this._history.lastEnterRoomReason === 'Flee';
  }

  public get canFlee(): boolean {
    if (this.state === GameState.InRoom) {
      return !this.didFleeLastRoom;
    }
    return false;
  }

  private discard(card: DonsolCard) {
    this._discardPile.update(prev => [...prev, card]);
  }

  public playCard(card: DonsolCard) {
    if (this.state === GameState.Lost) {
      throw "Can't play when dead";
    }

    // Remove card from room
    this._room.update(prev => prev.filter(roomCard => card.id !== roomCard.id));

    // Apply effect
    switch (card.kind) {
      case 'monster':
        this.fightMonster(card);
        break;
      case 'potion':
        this.drinkPotion(card);
        break;
      case 'shield':
        this.pickShield(card);
        break;
    }

    this.discard(card);
  }
}
