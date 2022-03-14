import React, {ReactElement} from 'react';
import {CardList} from '@components/CardList';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';

export function CardsScreen(): ReactElement {
  return (
    <ScrollingScreenContainer>
      <CardList />
    </ScrollingScreenContainer>
  );
}
