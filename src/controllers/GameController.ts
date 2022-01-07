import {EventDispatcher} from './EventDispatcher';
import {Card, Deck} from './Deck';
import {DonsolCard} from './DonsolCard';
import {ObservableValue} from './Observable';

type Room = Readonly<DonsolCard[]>;
type DiscardPile = Readonly<Card[]>;

const NUM_CARDS_IN_ROOM = 4;

export enum GameState {
  Idle = 'Idle',
  InRoom = 'InRoom',
  RoomCleared = 'RoomCleared',
  Lost = 'Lost',
  Won = 'Won',
}

export interface GameEventListener {
  onEnterRoom?(room: Room): void;
  onDeckUpdated?(numCards: number): void;
  onDiscardPileUpdated?(pile: DiscardPile): void;
  onRoomUpdated?(room: Room): void;
  onStateChange?(state: GameState): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  private _room: ObservableValue<Room>;
  private _discardPile: ObservableValue<DiscardPile>;
  private _deck: Readonly<Deck>;
  private _state: ObservableValue<GameState>;

  constructor() {
    super();

    this._deck = new Deck(() =>
      this.dispatchEvent('onDeckUpdated', this.deckCount),
    );
    this._room = new ObservableValue<Room>([], () =>
      this.dispatchEvent('onRoomUpdated', this.room),
    );
    this._discardPile = new ObservableValue<DiscardPile>([], () =>
      this.dispatchEvent('onDiscardPileUpdated', this.discardPile),
    );
    this._state = new ObservableValue<GameState>(GameState.Idle, () =>
      this.dispatchEvent('onStateChange', this.state),
    );
  }

  public reset(): void {
    this._room.update([]);
    this._discardPile.update([]);
    this._deck.reset();
    this._state.update(GameState.Idle);
  }

  public get canEnterRoom(): boolean {
    return (
      this.state === GameState.Idle || this.state === GameState.RoomCleared
    );
  }

  public get room(): Room {
    return this._room.value;
  }

  public get discardPile(): DiscardPile {
    return this._discardPile.value;
  }

  public get deckCount(): number {
    return this._deck.count;
  }

  public get state(): GameState {
    return this._state.value;
  }

  public get roomCount(): number {
    return Math.floor(this.discardPile.length / NUM_CARDS_IN_ROOM);
  }

  public enterRoom() {
    if (this.canEnterRoom) {
      const roomCards = this._deck
        .draw(NUM_CARDS_IN_ROOM)
        .map(card => new DonsolCard(card));
      this._room.update(roomCards);
      this._state.update(GameState.InRoom);
    } else {
      throw 'Can not enter room';
    }
  }

  public playCard(_: DonsolCard) {}

  private onStateChange() {
    this.dispatchEvent('onStateChange', this.state);
  }
}
