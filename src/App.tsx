import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {colors} from './colors';
import {Counter} from '@components/Counter';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>React Native</Text>
      <StatusBar barStyle="light-content" />
      <Counter />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
    padding: 8,
  },
});

export default App;
