import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';

export function GameScreen(): ReactElement {
  return (
    <ScrollingScreenContainer>
      <GameView />
    </ScrollingScreenContainer>
  );
}
