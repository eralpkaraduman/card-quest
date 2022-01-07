import {EventDispatcher} from './EventDispatcher';
import {Card, Deck} from './Deck';
import {DonsolCard} from './DonsolCard';
import {ObservableValue} from './Observable';

type Room = Readonly<DonsolCard[]>;
type DiscardPile = Readonly<Card[]>;

export interface GameEventListener {
  onEnterRoom?(room: Room): void;
  onDeckUpdated?(numCards: number): void;
  onDiscardPileUpdated?(): void;
  onRoomUpdated?(room: Room): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  private room: ObservableValue<Room>;
  private discardPile: ObservableValue<DiscardPile>;
  private deck: Readonly<Deck>;
  private isRoomClear: ObservableValue<boolean>;

  constructor() {
    super();

    this.deck = new Deck(this.onDeckChange.bind(this));
    this.room = new ObservableValue<Room>([], this.onRoomChange.bind(this));
    this.discardPile = new ObservableValue<DiscardPile>(
      [],
      this.onDiscardPileChange.bind(this),
    );
    this.isRoomClear = new ObservableValue<boolean>(
      true,
      this.onIsRoomClearChange.bind(this),
    );
  }

  public reset(): void {
    this.room.update([]);
    this.discardPile.update([]);
    this.deck.reset();
  }

  public enterRoom() {
    if (this.isRoomClear.value) {
      const roomCards = this.deck.draw(4).map(card => new DonsolCard(card));
      this.room.update(roomCards);
      this.dispatchEvent('onEnterRoom', this.room.value);
    } else {
      throw 'Current room is not clear';
    }
  }

  public get state(): {room: Room} {
    return {room: this.room.value};
  }

  public playCard(_: DonsolCard) {}

  // Observers
  private onRoomChange(room?: Room): void {
    this.dispatchEvent('onRoomUpdated', room!);
    this.isRoomClear.update(room?.length === 0);
  }

  private onDiscardPileChange(_?: DiscardPile) {
    this.dispatchEvent('onDiscardPileUpdated');
  }

  private onDeckChange(deck: Deck) {
    this.dispatchEvent('onDeckUpdated', deck.count);
  }

  private onIsRoomClearChange() {}
}
