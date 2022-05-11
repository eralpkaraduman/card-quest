import {GameState} from './GameController';
import {GameEvent} from './GameEventHistory';

export class DonsolEventDescriptor {
  gameEvent: GameEvent;

  constructor(gameEvent: GameEvent) {
    this.gameEvent = gameEvent;
  }

  private describeGameState(state: GameState) {
    switch (state) {
      case 'Idle':
        return '';
      case 'InRoom':
        return 'You are in the room.';
      case 'Lost':
        return 'You died. Game lost.';
      case 'Won':
        return 'Game won, you survived the dungeon!';
      default:
        return `Game State Changed: ${state}`;
    }
  }

  get description(): string {
    const {kind} = this.gameEvent;
    switch (kind) {
      case 'EnterRoom':
        return 'Enter room: ' + this.gameEvent.reason;
      case 'Fight':
        return `Fight: ${this.gameEvent.monster.effect}, hurt: ${this.gameEvent.hurt}`;
      case 'Block':
        return `Shield block: ${this.gameEvent.amount}${
          this.gameEvent.broke ? ', broke!' : ''
        }`;

      case 'PlayCard':
        return `Played card: ${this.gameEvent.card}`;
      case 'DrinkPotion':
        return `Drank potion: gained ${this.gameEvent.gainedHealth} health`;
      case 'PickShield':
        return `Picked shield: ${this.gameEvent.card.effect}`;
      case 'StateChange':
        return this.describeGameState(this.gameEvent.state);
      default:
        return JSON.stringify(this.gameEvent);
    }
  }
}
