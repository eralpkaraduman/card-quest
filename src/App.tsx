import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {defaultTheme} from './theme';
import {ThemeProvider} from 'styled-components/native';
import HomeScreen from '@screens/HomeScreen';
import {CardsScreen} from '@screens/CardsScreen';

const Tab = createBottomTabNavigator();
const TabBarIcons: {
  [key in Tabs]: [active: string, inactive: string];
} = {
  HomeTab: ['dungeon', 'dungeon'],
  CardsTab: ['scroll', 'scroll'],
};

enum Routes {
  Home = 'HomeScreen',
  Cards = 'CardsScreen',
}

enum Tabs {
  Home = 'HomeTab',
  Cards = 'CardsTab',
}

const Navigators: {
  [key in Tabs]: ReturnType<typeof createNativeStackNavigator>;
} = {
  HomeTab: createNativeStackNavigator(),
  CardsTab: createNativeStackNavigator(),
};

function HomeStack() {
  return (
    <Navigators.HomeTab.Navigator initialRouteName={Routes.Home}>
      <Navigators.HomeTab.Screen name={Routes.Home} component={HomeScreen} />
    </Navigators.HomeTab.Navigator>
  );
}

function CardsStack() {
  return (
    <Navigators.CardsTab.Navigator initialRouteName={Routes.Cards}>
      <Navigators.HomeTab.Screen name={Routes.Cards} component={CardsScreen} />
    </Navigators.CardsTab.Navigator>
  );
}

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name={TabBarIcons[route.name as Tabs][focused ? 0 : 1]}
                color={color}
                size={size}
              />
            ),
            tabBarActiveTintColor: defaultTheme.colors.red,
            tabBarInactiveTintColor: defaultTheme.colors.secondary,
            headerShown: false,
          })}>
          <Tab.Screen name={Tabs.Home} component={HomeStack} />
          <Tab.Screen name={Tabs.Cards} component={CardsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
