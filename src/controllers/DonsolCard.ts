import {Card, cardList, CardSuit} from './Deck';

export enum DonsolCardKind {
  monster = 'monster',
  shield = 'shield',
  potion = 'potion',
}

const CardKindValueMap: {
  [key in DonsolCardKind]: {
    J: number;
    Q: number;
    K: number;
    A: number;
  };
} = {
  [DonsolCardKind.monster]: {
    J: 11,
    Q: 13,
    K: 15,
    A: 17,
  },
  [DonsolCardKind.shield]: {
    J: 11,
    Q: 11,
    K: 11,
    A: 11,
  },
  [DonsolCardKind.potion]: {
    J: 11,
    Q: 11,
    K: 11,
    A: 11,
  },
};

export class DonsolCard {
  public card: Card;

  private _roomOrder: number;
  public get roomOrder(): number {
    return this._roomOrder;
  }

  public get kind(): DonsolCardKind {
    switch (this.card.suit) {
      case CardSuit.diamonds:
        return DonsolCardKind.shield;
      case CardSuit.clubs:
      case CardSuit.spades:
      case CardSuit.joker:
        return DonsolCardKind.monster;
      case CardSuit.hearts:
        return DonsolCardKind.potion;
    }
  }

  public get effect(): number {
    const {value} = this.card;
    if (typeof value === 'number') {
      return value;
    }

    if (value === '*0' || value === '*1') {
      return 21;
    }

    return CardKindValueMap[this.kind][value];
  }

  constructor(card: Card, roomOrder: number) {
    this.card = card;
    this._roomOrder = roomOrder;
  }

  public get id() {
    return `${this.card.suit}${this.card.value}`;
  }

  public toString(): string {
    return this.id;
  }

  public static fromString(id?: string): DonsolCard | undefined {
    if (!id) {
      return undefined;
    }
    return allDonsolCards.find(({id: cardId}) => cardId === id);
  }
}

const allDonsolCards = cardList.map(
  (card, index) => new DonsolCard(card, index),
);

export const partitionedGameCards = {
  potions: allDonsolCards.filter(({kind}) => kind === DonsolCardKind.potion),
  monsters: allDonsolCards.filter(({kind}) => kind === DonsolCardKind.monster),
  shields: allDonsolCards.filter(({kind}) => kind === DonsolCardKind.shield),
};
