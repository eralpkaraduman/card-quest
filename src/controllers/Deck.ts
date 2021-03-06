import {ChangeNotifier, ChangeHandler} from './Observable';

export enum CardSuit {
  hearts = '♥',
  diamonds = '♦',
  clubs = '♣',
  spades = '♠',
  joker = '★',
}

export type CardValue =
  | 'A'
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 'J'
  | 'Q'
  | 'K'
  | '*0'
  | '*1';

export type Card = {
  suit: CardSuit;
  value: CardValue;
};

export class Deck extends ChangeNotifier {
  private _cards: Card[];

  constructor(observer: ChangeHandler, init?: Card[]) {
    super(observer);
    if (init) {
      this._cards = [...init];
    } else {
      this._cards = [...cardList];
      this.shuffle();
    }
  }

  get cards(): Card[] {
    return [...this._cards];
  }

  public shuffle() {
    // Fisher-Yates shuffle: https://bost.ocks.org/mike/shuffle/
    const shuffledCards = [...this._cards];
    let m = shuffledCards.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = shuffledCards[m];
      shuffledCards[m] = shuffledCards[i];
      shuffledCards[i] = t;
    }

    this._cards = shuffledCards;
  }

  draw(amount = 1): Card[] {
    const drawnCards: Card[] = [];
    while (amount-- && this._cards.length) {
      const card = this._cards.pop();
      if (card) {
        drawnCards.push(card);
      }
    }
    this.notifyObserver();
    return drawnCards;
  }

  shuffleWithCards(addCards: Card[]) {
    if (addCards.length > 0) {
      this._cards = [...this._cards, ...addCards];
      this.shuffle();
    }
  }

  reset() {
    this._cards = [...cardList];
    this.shuffle();
    this.notifyObserver();
  }
}

export const cardList: Readonly<Card[]> = [
  {
    suit: CardSuit.hearts,
    value: 2,
  },
  {
    suit: CardSuit.hearts,
    value: 3,
  },
  {
    suit: CardSuit.hearts,
    value: 4,
  },
  {
    suit: CardSuit.hearts,
    value: 5,
  },
  {
    suit: CardSuit.hearts,
    value: 6,
  },
  {
    suit: CardSuit.hearts,
    value: 7,
  },
  {
    suit: CardSuit.hearts,
    value: 8,
  },
  {
    suit: CardSuit.hearts,
    value: 9,
  },
  {
    suit: CardSuit.hearts,
    value: 10,
  },
  {
    suit: CardSuit.hearts,
    value: 'J',
  },
  {
    suit: CardSuit.hearts,
    value: 'Q',
  },
  {
    suit: CardSuit.hearts,
    value: 'K',
  },
  {
    suit: CardSuit.hearts,
    value: 'A',
  },
  {
    suit: CardSuit.diamonds,
    value: 2,
  },
  {
    suit: CardSuit.diamonds,
    value: 3,
  },
  {
    suit: CardSuit.diamonds,
    value: 4,
  },
  {
    suit: CardSuit.diamonds,
    value: 5,
  },
  {
    suit: CardSuit.diamonds,
    value: 6,
  },
  {
    suit: CardSuit.diamonds,
    value: 7,
  },
  {
    suit: CardSuit.diamonds,
    value: 8,
  },
  {
    suit: CardSuit.diamonds,
    value: 9,
  },
  {
    suit: CardSuit.diamonds,
    value: 10,
  },
  {
    suit: CardSuit.diamonds,
    value: 'J',
  },
  {
    suit: CardSuit.diamonds,
    value: 'Q',
  },
  {
    suit: CardSuit.diamonds,
    value: 'K',
  },
  {
    suit: CardSuit.diamonds,
    value: 'A',
  },
  {
    suit: CardSuit.clubs,
    value: 2,
  },
  {
    suit: CardSuit.clubs,
    value: 3,
  },
  {
    suit: CardSuit.clubs,
    value: 4,
  },
  {
    suit: CardSuit.clubs,
    value: 5,
  },
  {
    suit: CardSuit.clubs,
    value: 6,
  },
  {
    suit: CardSuit.clubs,
    value: 7,
  },
  {
    suit: CardSuit.clubs,
    value: 8,
  },
  {
    suit: CardSuit.clubs,
    value: 9,
  },
  {
    suit: CardSuit.clubs,
    value: 10,
  },
  {
    suit: CardSuit.clubs,
    value: 'J',
  },
  {
    suit: CardSuit.clubs,
    value: 'Q',
  },
  {
    suit: CardSuit.clubs,
    value: 'K',
  },
  {
    suit: CardSuit.clubs,
    value: 'A',
  },
  {
    suit: CardSuit.spades,
    value: 2,
  },
  {
    suit: CardSuit.spades,
    value: 3,
  },
  {
    suit: CardSuit.spades,
    value: 4,
  },
  {
    suit: CardSuit.spades,
    value: 5,
  },
  {
    suit: CardSuit.spades,
    value: 6,
  },
  {
    suit: CardSuit.spades,
    value: 7,
  },
  {
    suit: CardSuit.spades,
    value: 8,
  },
  {
    suit: CardSuit.spades,
    value: 9,
  },
  {
    suit: CardSuit.spades,
    value: 10,
  },
  {
    suit: CardSuit.spades,
    value: 'J',
  },
  {
    suit: CardSuit.spades,
    value: 'Q',
  },
  {
    suit: CardSuit.spades,
    value: 'K',
  },
  {
    suit: CardSuit.spades,
    value: 'A',
  },
  {
    suit: CardSuit.joker,
    value: '*0',
  },
  {
    suit: CardSuit.joker,
    value: '*1',
  },
];
