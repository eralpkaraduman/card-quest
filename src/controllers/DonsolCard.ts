import {Card} from './Deck';

export class DonsolCard {
  public card: Card;

  constructor(card: Card) {
    this.card = card;
  }

  public toString(): string {
    return `${this.card.suit} ${this.card.value}`;
  }
}
