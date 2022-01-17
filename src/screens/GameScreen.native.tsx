import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export function GameScreen(): ReactElement {
  return (
    <Container>
      <GameView />
    </Container>
  );
}
