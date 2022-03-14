import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import {useNavigation} from '@react-navigation/native';
import {BattleLogTabNavigatorParams} from '@/App.native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';

export function GameScreen(): ReactElement {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<BattleLogTabNavigatorParams, 'BattleLogScreen'>
    >();
  return (
    <ScrollingScreenContainer>
      <GameView
        onNavigateToBattleLog={() => {
          navigation.navigate('BattleLogScreen');
        }}
      />
    </ScrollingScreenContainer>
  );
}
