import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon_FA5 from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {defaultTheme} from './theme';
import {ThemeProvider} from 'styled-components/native';
import HomeScreen from '@screens/HomeScreen';
import {CardsScreen} from '@screens/CardsScreen';
import {GameScreen} from '@screens/GameScreen.native';

const Tab = createBottomTabNavigator();
const TabBarIcons: {
  [key in Tabs]: [
    active: string,
    inactive: string,
    component: typeof Icon_FA5 | typeof MIcon,
    title: string,
  ];
} = {
  HomeTab: ['dungeon', 'dungeon', Icon_FA5, 'Home'],
  CardsTab: ['scroll', 'scroll', Icon_FA5, 'All Cards'],
  GameTab: ['sword', 'sword', MIcon, 'Game'],
};

enum Routes {
  Home = 'HomeScreen',
  Cards = 'CardsScreen',
  Game = 'GameScreen',
}

enum Tabs {
  Home = 'HomeTab',
  Cards = 'CardsTab',
  Game = 'GameTab',
}

enum Titles {
  Home = 'Home',
  Cards = 'All Cards',
  Game = 'Game',
}

const Navigators: {
  [key in Tabs]: ReturnType<typeof createNativeStackNavigator>;
} = {
  HomeTab: createNativeStackNavigator(),
  CardsTab: createNativeStackNavigator(),
  GameTab: createNativeStackNavigator(),
};

function HomeStack() {
  return (
    <Navigators.HomeTab.Navigator initialRouteName={Routes.Home}>
      <Navigators.HomeTab.Screen name={Titles.Home} component={HomeScreen} />
    </Navigators.HomeTab.Navigator>
  );
}

function CardsStack() {
  return (
    <Navigators.CardsTab.Navigator initialRouteName={Routes.Cards}>
      <Navigators.CardsTab.Screen name={Titles.Cards} component={CardsScreen} />
    </Navigators.CardsTab.Navigator>
  );
}

function GameStack() {
  return (
    <Navigators.GameTab.Navigator initialRouteName={Routes.Game}>
      <Navigators.GameTab.Screen name={Titles.Game} component={GameScreen} />
    </Navigators.GameTab.Navigator>
  );
}

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarLabel: TabBarIcons[route.name as Tabs][3],
            tabBarIcon: ({focused, color, size}) => {
              const [icon0, icon1, IconComponent] =
                TabBarIcons[route.name as Tabs];
              return (
                <IconComponent
                  name={focused ? icon0 : icon1}
                  color={color}
                  size={size}
                />
              );
            },
            tabBarActiveTintColor: defaultTheme.colors.red,
            tabBarInactiveTintColor: defaultTheme.colors.secondary,
            headerShown: false,
          })}>
          <Tab.Screen name={Tabs.Home} component={HomeStack} />
          <Tab.Screen name={Tabs.Cards} component={CardsStack} />
          <Tab.Screen name={Tabs.Game} component={GameStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
