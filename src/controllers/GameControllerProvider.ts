import React, {useEffect} from 'react';
import {GameController} from './GameController';
import {GameEvent} from './GameEventHistory';
export type {GameEvent} from './GameEventHistory';

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

// TODO: Extract to separate file
export function useGameHistory(): GameEvent[] {
  const game = useGameController();
  const [history, setHistory] = React.useState<GameEvent[]>(game.history);
  useEffect(() => {
    const removeEventListener = game.addEventListener({
      onHistoryUpdated() {
        setHistory(game.history);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  return history;
}
