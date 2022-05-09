import {CardSuit} from './Deck';
import {DonsolCard, DonsolCardKind} from './DonsolCard';

export class DonsolCardDescriptor {
  donsolCard;
  constructor(donsolCard: DonsolCard) {
    this.donsolCard = donsolCard;
  }

  get description(): string {
    return `This card is a ${this.donsolCard.kind}. ${this.kindDescription}`;
  }

  get title(): string {
    if (this.isDonsol) {
      return this.cardSuitDisplayText;
    }
    return `${this.cardValueDisplayText} of ${this.cardSuitDisplayText}`;
  }

  get cardValueDisplayText() {
    const {value} = this.donsolCard.card;
    switch (value) {
      case 'A':
        return 'Ace';
      case 'J':
        return 'Jack';
      case 'Q':
        return 'Queen';
      case 'K':
        return 'King';
      case '*0':
      case '*1':
        return 'Joker';
      default:
        return value;
    }
  }

  get cardSuitDisplayText() {
    switch (this.donsolCard.card.suit) {
      case CardSuit.joker:
        return 'Joker';
      case CardSuit.clubs:
        return 'Clubs';
      case CardSuit.diamonds:
        return 'Diamonds';
      case CardSuit.hearts:
        return 'Hearts';
      case CardSuit.spades:
        return 'Spades';
    }
  }

  get isDonsol(): boolean {
    return this.donsolCard.card.suit === '★';
  }

  get kindDescription(): string | undefined {
    const {kind, effect} = this.donsolCard;
    switch (kind) {
      case DonsolCardKind.monster:
        return (
          `Hurts you ${effect} points, unless you have a shield exceeding its value. ` +
          (effect === 21
            ? 'This monster is known as the "donsol". They hurt you the most. ' +
              "There's only 2 of these cards. "
            : '') +
          'You die if you have less than zero health after this card hurts you and the game ends. ' +
          "If you don't want to fight this monster, you may skip the room. " +
          ''.trim()
        );
      case DonsolCardKind.potion:
        return (
          `Heals you ${effect} points. ` +
          "Will only effect if you haven't played a potion card previously. " +
          "Playing potion cards back to back will make you sick, and the next potion won't effect. " +
          'Play another type of card in between potions to recover from sickness.' +
          ''.trim()
        );
      case DonsolCardKind.shield:
        return (
          `Grab a new shield with ${effect} points. ` +
          'Equipping this shield will replace the previous one. ' +
          "You won't get hurt by attacking a monster equal or lower than the shield points. " +
          'If you block a monster with value higher than the shield, you will only get hurt by the amount exceeding points. ' +
          'You can only block monsters lower than the value you blocked before with the same shield. ' +
          'If you block a monster with higher points then previous, shield will break. And you will take the all damage. ' +
          'Change your shield after you blocked a low point monster.' +
          ''.trim()
        );
    }
  }
}
