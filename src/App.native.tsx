import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
  ParamListBase,
} from '@react-navigation/native';
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
import HomeScreen from '@screens/HomeScreen.native';
import {CardsScreen} from '@screens/CardsScreen.native';
import {GameScreen} from '@screens/GameScreen.native';
import {BattleLogScreen} from '@screens/BattleLogScreen.native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  BattleLogTabNavigatorProps,
  CardsTabNavigatorProps,
  GameTabNavigatorProps,
  HomeTabNavigatorProps,
  TabProps,
  TabType,
} from './global';

const TabBar = createBottomTabNavigator<RootNavigatorProps>();
const HomeTab = createNativeStackNavigator<HomeTabNavigatorProps>();
const CardsTab = createNativeStackNavigator<CardsTabNavigatorProps>();
const GameTab = createNativeStackNavigator<GameTabNavigatorProps>();
const BattleLogTab = createNativeStackNavigator<BattleLogTabNavigatorProps>();

const commonNavigationOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: defaultTheme.colors.darkGray,
  },
  headerTitleStyle: {
    color: defaultTheme.colors.main,
    fontFamily: defaultTheme.fontFamily.title,
  },
};

export type TabPropsType<K extends TabType> = TabProps[K] & ParamListBase;
export type RootNavigatorProps = {
  [Key in keyof TabProps]: NavigatorScreenParams<TabProps[Key]>;
};

function HomeStackScreen() {
  return (
    <HomeTab.Navigator screenOptions={commonNavigationOptions}>
      <HomeTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Card Quest'}}
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
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={defaultTheme}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <TabBar.Navigator
              screenOptions={{
                tabBarActiveTintColor: defaultTheme.colors.red,
                tabBarInactiveTintColor: defaultTheme.colors.secondary,
                tabBarStyle: {
                  backgroundColor: defaultTheme.colors.darkGray,
                  borderTopColor: defaultTheme.colors.darkGray,
                },
                headerShown: false,
              }}
            >
              <TabBar.Screen
                name="HomeTab"
                component={HomeStackScreen}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({color, size}) => (
                    <Icon_FA5 size={size} color={color} name={'dungeon'} />
                  ),
                }}
              />
              <TabBar.Screen
                name="CardsTab"
                component={CardsStackScreen}
                options={{
                  tabBarLabel: 'Cards',
                  tabBarIcon: ({color, size}) => (
                    <Icon_Entypo size={size} color={color} name={'documents'} />
                  ),
                }}
              />
              <TabBar.Screen
                name="GameTab"
                component={GameStackScreen}
                options={{
                  tabBarLabel: 'Game',
                  tabBarIcon: ({color, size}) => (
                    <Icon_Material size={size} color={color} name={'sword'} />
                  ),
                }}
              />
              <TabBar.Screen
                name="BattleLogTab"
                component={BattleLogStackScreen}
                options={{
                  tabBarLabel: 'Log',
                  tabBarIcon: ({color, size}) => (
                    <Icon_FA5 size={size} color={color} name={'scroll'} />
                  ),
                }}
              />
            </TabBar.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
