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

  constructor() {
    super();

    const roomObserver = (room?: Room) => {
      this.dispatchEvent('onRoomUpdated', room!);
    };

    const discardPileObserver = (_?: DiscardPile) => {
      this.dispatchEvent('onDiscardPileUpdated');
    };

    const deckObsserver = () => {
      this.dispatchEvent('onDeckUpdated', this.deck.count);
    };

    this.room = new ObservableValue<Room>([], roomObserver);
    this.discardPile = new ObservableValue<DiscardPile>(
      [],
      discardPileObserver,
    );
    this.deck = new Deck(deckObsserver);
  }

  public reset(): void {
    this.room.update([]);
    this.discardPile.update([]);
    this.deck.reset();
  }

  public enterRoom() {
    const roomCards = this.deck.draw(4).map(card => new DonsolCard(card));
    this.room.update(roomCards);
    this.dispatchEvent('onEnterRoom', this.room.value);
  }

  public playCard(_: DonsolCard) {}
}
