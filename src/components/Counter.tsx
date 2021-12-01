import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {styles} from './Counter.styles';

export function Counter(): React.ReactElement {
  const [num, setNum] = useState<number>(1);
  const handleOnClick = () => setNum(prev => prev + 1);
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Hi React Native</Text>
      <TouchableOpacity onPress={handleOnClick}>
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>
      <Text style={styles.numberText}>{num}</Text>
    </View>
  );
}
