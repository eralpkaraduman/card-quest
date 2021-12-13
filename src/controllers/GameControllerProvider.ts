import React from 'react';
import {GameController} from './GameController';

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
