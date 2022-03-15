import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon_FA5 from 'react-native-vector-icons/FontAwesome5';
import Icon_Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon_Entypo from 'react-native-vector-icons/Entypo';

import {defaultTheme} from './theme';
import HomeScreen from '@screens/HomeScreen'; // TODO: Prefix this to .native.tsx
import {CardsScreen} from '@screens/CardsScreen.native';
import {GameScreen} from '@screens/GameScreen.native';
import {BattleLogScreen} from '@screens/BattleLogScreen.native';

const {Navigator: TabNavigator, Screen: TabScreen} = createBottomTabNavigator();

export type HomeTabNavigatorParams = {HomeScreen: undefined};
export type CardsTabNavigatorParams = {CardsScreen: undefined};
export type GameTabNavigatorParams = {GameScreen: undefined};
export type BattleLogTabNavigatorParams = {BattleLogScreen: undefined};

const HomeTab = createNativeStackNavigator<HomeTabNavigatorParams>();
const CardsTab = createNativeStackNavigator<CardsTabNavigatorParams>();
const GameTab = createNativeStackNavigator<GameTabNavigatorParams>();
const BattleLogTab = createNativeStackNavigator<BattleLogTabNavigatorParams>();

const commonNavigationOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: defaultTheme.colors.darkGray,
  },
  headerTitleStyle: {
    color: defaultTheme.colors.main,
    fontFamily: defaultTheme.fontFamily.title,
  },
};

function HomeStackScreen() {
  return (
    <HomeTab.Navigator screenOptions={commonNavigationOptions}>
      <HomeTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
    </HomeTab.Navigator>
  );
}

function CardsStackScreen() {
  return (
    <CardsTab.Navigator screenOptions={commonNavigationOptions}>
      <CardsTab.Screen
        name="CardsScreen"
        component={CardsScreen}
        options={{title: 'All Cards'}}
      />
    </CardsTab.Navigator>
  );
}

function GameStackScreen() {
  return (
    <GameTab.Navigator screenOptions={commonNavigationOptions}>
      <GameTab.Screen
        name="GameScreen"
        component={GameScreen}
        options={{title: 'Game'}}
      />
    </GameTab.Navigator>
  );
}

function BattleLogStackScreen() {
  return (
    <BattleLogTab.Navigator screenOptions={commonNavigationOptions}>
      <BattleLogTab.Screen
        name="BattleLogScreen"
        component={BattleLogScreen}
        options={{title: 'Battle Log'}}
      />
    </BattleLogTab.Navigator>
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
            tabBarStyle: {
              backgroundColor: defaultTheme.colors.darkGray,
              borderTopColor: defaultTheme.colors.darkGray,
            },
            headerShown: false,
          }}>
          <TabScreen
            name="Home Tab"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <Icon_FA5 size={size} color={color} name={'dungeon'} />
              ),
            }}
          />
          <TabScreen
            name="Cards Tab"
            component={CardsStackScreen}
            options={{
              tabBarLabel: 'Cards',
              tabBarIcon: ({color, size}) => (
                <Icon_Entypo size={size} color={color} name={'documents'} />
              ),
            }}
          />
          <TabScreen
            name="Game Tab"
            component={GameStackScreen}
            options={{
              tabBarLabel: 'Game',
              tabBarIcon: ({color, size}) => (
                <Icon_Material size={size} color={color} name={'sword'} />
              ),
            }}
          />
          <TabScreen
            name="Battle Log Tab"
            component={BattleLogStackScreen}
            options={{
              tabBarLabel: 'Log',
              tabBarIcon: ({color, size}) => (
                <Icon_FA5 size={size} color={color} name={'scroll'} />
              ),
            }}
          />
        </TabNavigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
