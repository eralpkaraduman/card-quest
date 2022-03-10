import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {HomeScreenNavigationProp} from '@/App.native';

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

export function GameScreen(): ReactElement {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <Container>
      <ScrollView>
        <GameView
          onNavigateToBattleLog={() => {
            navigation.navigate('HomeScreen');
          }}
        />
      </ScrollView>
    </Container>
  );
}
