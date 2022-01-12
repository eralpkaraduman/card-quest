import {EventDispatcher} from './EventDispatcher';
import {Deck} from './Deck';
import {DonsolCard, DonsolCardKind} from './DonsolCard';
import {Observable} from './Observable';
import {GameEvent, GameEventHistory} from './GameEventHistory';

const NUM_CARDS_IN_ROOM = 4;
const MAX_HEALTH = 21;

export enum GameState {
  Idle = 'Idle',
  InRoom = 'InRoom',
  Lost = 'Lost',
  Won = 'Won',
}

export interface GameEventListener {
  onDeckUpdated?(): void;
  onRoomUpdated?(): void;
  onStateChange?(): void;
  onHealthChange?(): void;
  onShieldChange?(): void;
  onHistoryUpdated?(): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  private _room: Observable<DonsolCard[]>;
  private _deck: Readonly<Deck>;
  private _state: Observable<GameState>;
  private _health: Observable<number>;
  private _shield: Observable<DonsolCard | undefined>;
  private _history: Readonly<GameEventHistory>;

  constructor() {
    super();

    this._deck = new Deck(() => {
      this.dispatchEvent('onDeckUpdated');
      if (this.deckCount <= 0 && this.health > 0) {
        this._state.update(GameState.Won);
      }
    });

    this._room = new Observable<DonsolCard[]>([], () => {
      this.dispatchEvent('onRoomUpdated');
    });

    this._state = new Observable<GameState>(GameState.Idle, () => {
      this._history.add('StateChange', {state: this.state});
      this.dispatchEvent('onStateChange');
    });

    this._health = new Observable<number>(MAX_HEALTH, () => {
      this.dispatchEvent('onHealthChange');
      if (this.health <= 0) {
        // Dead
        this._state.update(GameState.Lost);
      }
    });

    this._shield = new Observable<DonsolCard | undefined>(undefined, () => {
      this.dispatchEvent('onShieldChange');
    });

    this._history = new GameEventHistory(() => {
      this.dispatchEvent('onHistoryUpdated');
    });
  }

  public reset(): void {
    this._deck.reset();
    this._room.reset();
    this._state.reset();
    this._health.reset();
    this._shield.reset();
    this._history.reset();
  }

  public get canAdvance(): boolean {
    const inClearRoom = this.isRoomClear && this.state === GameState.InRoom;
    return this.state === GameState.Idle || inClearRoom;
  }

  public get room(): DonsolCard[] {
    return this._room.value;
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

  public get shield(): DonsolCard | undefined {
    return this._shield.value;
  }

  public get history(): GameEvent[] {
    return this._history.history;
  }

  public get prevCardWasPotion(): boolean {
    return this.lastPlayedCard?.kind === DonsolCardKind.potion;
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
    if (!flee && this.canAdvance) {
      this._history.add('EnterRoom', {
        reason: this.state === GameState.Idle ? 'Begin' : 'Clear',
      });
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

  private fightMonster(monster: DonsolCard) {
    const hurt = this.blockMonsterWithShield(monster);
    this._health.update(prev => prev - hurt);
    this._history.add('Fight', {monster, hurt});
  }

  /**
   * @returns { number } amount gamage user gets after blocking
   */
  private blockMonsterWithShield(monster: DonsolCard): number {
    const monsterDamage = monster.effect;
    const shieldValue = this.shield?.effect ?? 0;
    const shieldId = this.shield?.id;

    // if user's shield previously blocked a lower value than current monster damage, shield breaks. User gets full damage
    if (
      this.lastBlockedMonster &&
      this.lastBlockedMonster.effect <= monsterDamage
    ) {
      this._shield.reset();
      this._history.add('Block', {
        amount: 0,
        broke: true,
        monster,
        shieldId,
      });
      return monsterDamage;
    }

    this._history.add('Block', {
      amount: shieldValue,
      broke: false,
      monster,
      shieldId,
    });
    return Math.max(0, monsterDamage - shieldValue);
  }

  public get lastBlockedMonster(): DonsolCard | undefined {
    const [block] = this._history.findEventsOfKind('Block');
    if (block?.amount > 0) {
      const {shieldId, monster, broke} = block;
      if (this.shield?.id === shieldId && !broke) {
        return monster;
      }
    }
    return undefined;
  }

  public get lastPlayedCard(): DonsolCard | undefined {
    const [lastCardPlay] = this._history.findEventsOfKind('PlayCard');
    return lastCardPlay?.card;
  }

  private pickShield(card: DonsolCard) {
    this._shield.update(card);
    this._history.add('PickShield', {
      card,
    });
  }

  private drinkPotion(card: DonsolCard) {
    // if player drinks potions back to back, gets sick, potion doesn't effect
    const gainedHealth = this.prevCardWasPotion ? 0 : card.effect;
    // player can't gain more healt than max
    this._health.update(prev => Math.min(MAX_HEALTH, prev + gainedHealth));
    this._history.add('DrinkPotion', {gainedHealth});
  }

  public get didFleeLastRoom() {
    const [lastEnterRoom] = this._history.findEventsOfKind('EnterRoom');
    return lastEnterRoom?.reason === 'Flee';
  }

  public get isRoomClear() {
    return this.room.length === 0;
  }

  public get canFlee(): boolean {
    if (this.state === GameState.InRoom && !this.isRoomClear) {
      return !this.didFleeLastRoom;
    }
    return false;
  }

  public playCard(card: DonsolCard) {
    if (this.state === GameState.Lost) {
      throw "Can't play when dead";
    }

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

    this._history.add('PlayCard', {card});
    // Remove card from room
    this._room.update(prev => prev.filter(roomCard => card.id !== roomCard.id));
  }
}
