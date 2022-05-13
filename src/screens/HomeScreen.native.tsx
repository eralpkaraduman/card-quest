import {HomeContent} from '@components/HomeContent';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import React, {ReactElement} from 'react';

export default function HomeScreen(): ReactElement {
  return (
    <ScrollingScreenContainer>
      <HomeContent />
    </ScrollingScreenContainer>
  );
}
