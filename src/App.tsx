import React from 'react';
import {View, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-vector-icons/Icon';
import {defaultTheme} from './theme';
import {ThemeProvider} from 'styled-components/native';

const Tab = createBottomTabNavigator();
const TabBarIcons: {
  [key in string]: {
    component: typeof Icon;
    active: string;
    inactive: string;
  };
} = {
  HomeTab: {
    component: Ionicons,
    active: 'ios-information-circle',
    inactive: 'ios-information-circle-outline',
  },
};
function getTabBarIcon(
  routeName: string,
  focused: boolean,
  color: string,
  size: number,
): React.ReactElement {
  const {component, active, inactive} = TabBarIcons[routeName];
  return React.createElement(component, {
    name: focused ? active : inactive,
    color,
    size,
  });
}

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) =>
              getTabBarIcon(route.name, focused, color, size),
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}>
          <Tab.Screen name="HomeTab" component={HomeTabStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const HomeTabStack = createNativeStackNavigator();
function HomeTabStackScreen() {
  return (
    <HomeTabStack.Navigator initialRouteName="HomeScreen">
      <HomeTabStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeTabStack.Navigator>
  );
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>React Native</Text>
      <StatusBar barStyle="light-content" />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: 'white',
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
    padding: 8,
  },
});

export default App;
