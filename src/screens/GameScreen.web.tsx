import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import {HeadTitle} from '@hooks/useHead.web';

export function GameScreen(): ReactElement {
  return (
    <>
      <HeadTitle>Card Quest: Game</HeadTitle>
      <GameView />
    </>
  );
}
