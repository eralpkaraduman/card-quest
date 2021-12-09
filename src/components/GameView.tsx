import React from 'react';
import {View} from 'react-native';
import {useGameController} from '@controllers/GameController';

export function GameView(): React.ReactElement {
  const gameController = useGameController();
  React.useEffect(() => {
    const removeEventListener = gameController.addEventListener({
      onGameStarted() {},
    });

    gameController.start();

    return () => {
      removeEventListener();
    };
  }, [gameController]);
  return <View />;
}
