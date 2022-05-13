import {
  CardsTabNavigatorProps,
  GameTabNavigatorProps,
  HomeTabNavigatorProps,
  BattleLogTabNavigatorProps,
  RootNavigatorProps,
} from '@/App.native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type HomeScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<HomeTabNavigatorProps, 'HomeScreen'>,
  NativeStackNavigationProp<RootNavigatorProps>
>;

export type GameScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<GameTabNavigatorProps, 'GameScreen'>,
  NativeStackNavigationProp<RootNavigatorProps>
>;

export type CardsScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<CardsTabNavigatorProps, 'CardsScreen'>,
  NativeStackNavigationProp<RootNavigatorProps>
>;

export type BattleLogScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BattleLogTabNavigatorProps, 'BattleLogScreen'>,
  NativeStackNavigationProp<RootNavigatorProps>
>;
