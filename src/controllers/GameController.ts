import {EventDispatcher} from './EventDispatcher';
import {Deck} from './Deck';
import {DonsolCard, DonsolCardKind} from './DonsolCard';
import {ObservableValue} from './Observable';

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
  onEnterRoom?(room: CardStack): void;
  onDeckUpdated?(numCards: number): void;
  onDiscardPileUpdated?(pile: CardStack): void;
  onRoomUpdated?(room: CardStack): void;
  onStateChange?(state: GameState, canEnterRoom: boolean): void;
  onHealthChange?(health: number): void;
  onShieldChange?(shield: Shield): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  private _room: ObservableValue<CardStack>;
  private _discardPile: ObservableValue<CardStack>;
  private _deck: Readonly<Deck>;
  private _state: ObservableValue<GameState>;
  private _health: ObservableValue<number>;
  private _shield: ObservableValue<Shield>;

  constructor() {
    super();

    this._deck = new Deck(() => {
      this.dispatchEvent('onDeckUpdated', this.deckCount);
      if (this.deckCount <= 0 && this.health > 0) {
        this._state.update(GameState.Won);
      }
    });

    this._room = new ObservableValue<CardStack>([], () => {
      if (this.room.length === 0) {
        this._state.update(GameState.RoomCleared);
      }
      this.dispatchEvent('onRoomUpdated', this.room);
    });

    this._discardPile = new ObservableValue<CardStack>([], () =>
      this.dispatchEvent('onDiscardPileUpdated', this.discardPile),
    );

    this._state = new ObservableValue<GameState>(GameState.Idle, () =>
      this.dispatchEvent('onStateChange', this.state, this.canEnterRoom),
    );

    this._health = new ObservableValue<number>(MAX_HEALTH, () => {
      this.dispatchEvent('onHealthChange', this.health);
      if (this.health <= 0) {
        // Dead
        this._state.update(GameState.Lost);
      }
    });

    this._shield = new ObservableValue<Shield>(null, () => {
      this.dispatchEvent('onShieldChange', this.shield);
    });
  }

  public reset(): void {
    this._deck.reset();
    this._room.reset();
    this._discardPile.reset();
    this._state.reset();
    this._health.reset();
    this._shield.reset();
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

  public get prevCardWasPotion(): boolean {
    const topCardInPile = this.discardPile.slice(-1)[0];

    return topCardInPile?.kind === DonsolCardKind.potion;
  }

  public enterRoom() {
    if (this.canEnterRoom) {
      const roomCards = this._deck
        .draw(NUM_CARDS_IN_ROOM)
        .map((card, order) => new DonsolCard(card, order));
      this._room.update(roomCards);
      this._state.update(GameState.InRoom);
    } else {
      throw "Can/'t enter room";
    }
  }

  private fightMonster(card: DonsolCard) {
    const shieldAbsorb = this.shield?.effect ?? 0;
    const totalDamage = card.effect - shieldAbsorb;
    if (totalDamage > 0) {
      this._health.update(prevHealth => prevHealth - totalDamage);
    }

    if (card.effect >= shieldAbsorb) {
      // shield breaks
      this._shield.update(null);
    }
  }

  private pickShield(card: DonsolCard) {
    this._shield.update(card);
  }

  private drinkPotion(card: DonsolCard) {
    if (this.prevCardWasPotion) {
      // did get sick, potion didn't effect
      return;
    }

    this._health.update(prev => {
      const newHealth = prev + card.effect;
      if (newHealth > MAX_HEALTH) {
        return MAX_HEALTH;
      } else {
        return newHealth;
      }
    });
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
