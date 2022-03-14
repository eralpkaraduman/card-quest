import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon_FA5 from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {defaultTheme} from './theme';
import {ThemeProvider} from 'styled-components/native';
import HomeScreen from '@screens/HomeScreen'; // TODO: Prefix this to .native.tsx
import {CardsScreen} from '@screens/CardsScreen.native';
import {GameScreen} from '@screens/GameScreen.native';

const {Navigator: TabNavigator, Screen: TabScreen} = createBottomTabNavigator();

enum Routes {
  Home = 'HomeScreen',
  Cards = 'CardsScreen',
  Game = 'GameScreen',
}

type HomeTabNavigatorParams = {HomeScreen: undefined};
type CardsTabNavigatorParams = {CardsScreen: undefined};
type GameTabNavigatorParams = {GameScreen: undefined};
//type BattleLogTabNavigatorParams = {GameScreen: undefined};

const HomeTab = createNativeStackNavigator<HomeTabNavigatorParams>();
const CardsTab = createNativeStackNavigator<CardsTabNavigatorParams>();
const GameTab = createNativeStackNavigator<GameTabNavigatorParams>();
//const BattleLogTab = createNativeStackNavigator<BattleLogTabNavigatorParams>();

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeTabNavigatorParams,
  'HomeScreen'
>;

function HomeStack() {
  return (
    <HomeTab.Navigator initialRouteName={Routes.Home}>
      <HomeTab.Screen name={'HomeScreen'} component={HomeScreen} />
    </HomeTab.Navigator>
  );
}

function CardsStack() {
  return (
    <CardsTab.Navigator initialRouteName={Routes.Cards}>
      <CardsTab.Screen name={'CardsScreen'} component={CardsScreen} />
    </CardsTab.Navigator>
  );
}

function GameStack() {
  return (
    <GameTab.Navigator initialRouteName={Routes.Game}>
      <GameTab.Screen name={'GameScreen'} component={GameScreen} />
    </GameTab.Navigator>
  );
}

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <TabNavigator
          screenOptions={{
            tabBarActiveTintColor: defaultTheme.colors.red,
            tabBarInactiveTintColor: defaultTheme.colors.secondary,
            headerShown: false,
          }}>
          <TabScreen
            name="Home Tab"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <Icon_FA5 size={size} color={color} name={'dungeon'} />
              ),
            }}
          />
          <TabScreen
            name="Cards Tab"
            component={CardsStack}
            options={{
              tabBarLabel: 'Cards',
              tabBarIcon: ({color, size}) => (
                <Icon_FA5 size={size} color={color} name={'scroll'} />
              ),
            }}
          />
          <TabScreen
            name="Game Tab"
            component={GameStack}
            options={{
              tabBarLabel: 'Game',
              tabBarIcon: ({color, size}) => (
                <MIcon size={size} color={color} name={'sword'} />
              ),
            }}
          />
        </TabNavigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
