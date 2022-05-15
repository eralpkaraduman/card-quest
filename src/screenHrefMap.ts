import {AnyScreenType} from './global';

export const ScreenHrefMap: {[K in AnyScreenType]: string} = {
  HomeScreen: '/home',
  BattleLogScreen: '/battle-log',
  GameScreen: '/game',
  CardsScreen: '/cards',
};
