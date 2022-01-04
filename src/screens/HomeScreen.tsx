import React, {ReactElement} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function HomeScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>React Native</Text>
    </View>
  );
}

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
