import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GameTabNavigatorProps, RootNavigatorProps} from '@/App.native';

type GameScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<GameTabNavigatorProps, 'GameScreen'>,
  NativeStackNavigationProp<RootNavigatorProps>
>;

export function GameScreen(): ReactElement {
  const navigation = useNavigation<GameScreenNavigationProps>();
  return (
    <ScrollingScreenContainer>
      <GameView
        onNavigateToBattleLog={() => {
          navigation.navigate('BattleLogTab', {screen: 'BattleLogScreen'});
        }}
      />
    </ScrollingScreenContainer>
  );
}
