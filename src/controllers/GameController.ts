import React from 'react';
import {EventDispatcher, IEventListener} from './EventDispatcher';

export interface GameState {
  room: never[];
  hand: never[];
  deck: never[];
}

export interface GameEventListener extends IEventListener {
  onGameStarted(gameState: GameState): void;
}

export class GameController extends EventDispatcher<GameEventListener> {
  public start(): void {}
}

const GameControllerContext = React.createContext<GameController>(
  new GameController(),
);

export function GameControllerProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return React.createElement(GameControllerContext.Provider, null, children);
}

export function useGameController(): GameController {
  return React.useContext(GameControllerContext);
}
