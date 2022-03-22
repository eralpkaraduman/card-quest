import {HomeTabNavigatorProps, RootNavigatorProps} from '@/App.native';
import {HomeContent} from '@components/HomeContent';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';

type HomeScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabNavigatorProps, 'HomeScreen'>,
  NativeStackNavigationProp<RootNavigatorProps>
>;

export default function HomeScreen(): ReactElement {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  return (
    <ScrollingScreenContainer>
      <HomeContent
        onNavigateToCardsScreen={() =>
          navigation.navigate('CardsTab', {screen: 'CardsScreen'})
        }
      />
    </ScrollingScreenContainer>
  );
}
