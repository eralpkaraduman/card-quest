import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {colors} from './colors';
import {Counter} from './components/Counter';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
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
    justifyContent: 'center',
  },
});

export default App;
