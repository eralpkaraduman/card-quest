import React, {ReactElement} from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {GameCardSize} from '@components/GameCard';
import {CardList} from '@components/CardList';

const Container = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.background};
`;

export function CardsScreen(): ReactElement {
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <CardList cardSize={GameCardSize.medium} numColumns={4} />
    </Container>
  );
}
