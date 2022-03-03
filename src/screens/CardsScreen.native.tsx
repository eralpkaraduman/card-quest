import React, {ReactElement} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import {CardList} from '@components/CardList';

const Container = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.background};
`;

export function CardsScreen(): ReactElement {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          padding: parseInt(theme.dimensions.padding.medium, 10),
        }}>
        <CardList />
      </ScrollView>
    </Container>
  );
}
