import {BattleLogView} from '@components/BattleLogView';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import React, {ReactElement} from 'react';

export function BattleLogScreen(): ReactElement {
  return (
    <ScrollingScreenContainer>
      <BattleLogView />
    </ScrollingScreenContainer>
  );
}
