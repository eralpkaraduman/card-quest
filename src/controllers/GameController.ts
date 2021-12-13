import {EventDispatcher} from './EventDispatcher';
import {Deck, Card} from './Deck';
import {DonsolCard} from './DonsolCard';

export interface GameState {
  room: DonsolCard[];
  deck: Deck;
  discard: Card[];
}

export interface GameEventListener {
  onEnterRoom(donsolCards: DonsolCard[]): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  private state!: GameState;

  constructor() {
    super();
    this.reset();
  }

  public reset(): void {
    this.state = {
      room: [],
      discard: [],
      deck: new Deck(),
    };
  }

  public enterRoom() {
    this.state.room = this.state.deck.draw(4).map(card => new DonsolCard(card));
    this._dispatchEvent('onEnterRoom', [...this.state.room]);
  }
}
