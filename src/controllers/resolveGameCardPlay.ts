import {GameController, GameInit, GameState} from '@controllers/GameController';
import {GameEventHistory} from '@controllers/GameEventHistory';
import {Falsy} from 'react-native';

function captureGameStatus(game: GameController): GameInit {
  return {
    health: game.health,
    deck: game.deck,
    room: game.room,
    state: game.state,
    shield: game.shield,
    history: game.history,
  };
}

export function resolveCardPlay(
  actualGame: GameController,
  cardSlot: number,
): undefined | PlayCardResult {
  if (actualGame.state !== GameState.InRoom) {
    return undefined;
  }
  const prev = captureGameStatus(actualGame);
  const clonedGame = new GameController(prev);
  const card = prev.room.find(c => c.roomOrder === cardSlot);
  if (!card) {
    return undefined;
  }
  clonedGame.playCard(card);
  const next = captureGameStatus(clonedGame);
  return diffGameStatus(prev, next);
}

export interface PlayCardResult {
  state: GameState;
  shieldChange: number;
  healthChange: number;
  shieldBroke: boolean;
  gotSick: boolean;
}

function diffGameStatus(prev: GameInit, next: GameInit): PlayCardResult {
  const numNewEvents = next.history.length - prev.history.length;
  const ne = next.history.slice(0, numNewEvents) ?? [];
  const newEvents = new GameEventHistory(() => {}, ne);

  const [blockEvent] = newEvents.findEventsOfKind('Block');
  const shieldBroke = blockEvent?.broke ?? false;

  const [potionEvent] = newEvents.findEventsOfKind('DrinkPotion');
  const gotSick = potionEvent?.gainedHealth === 0;

  const nextShieldValue = next.shield?.effect ?? 0;
  const prevShieldValue = prev.shield?.effect ?? 0;
  return {
    state: next.state,
    shieldChange: nextShieldValue - prevShieldValue,
    healthChange: next.health - prev.health,
    shieldBroke,
    gotSick,
  };
}

export function renderDiffAsString(diff?: PlayCardResult): string {
  if (!diff) {
    return 'x';
  }
  const shieldEmoji = '🛡';
  const explosionEmoji = '💥';
  const {gotSick, healthChange, state, shieldBroke, shieldChange} = diff;
  const signed = (n: number) => (n < 0 ? '' : '+') + n;
  let displays: (string | Falsy)[] = [
    gotSick && '🤢',
    healthChange !== 0 && '🩸' + signed(healthChange),
    state === GameState.Lost && '💀',
    shieldChange !== 0 &&
      shieldEmoji + (shieldBroke ? explosionEmoji : '') + signed(shieldChange),
  ];
  const text = displays.filter(Boolean).join(',');
  return text.length ? text : '';
}
