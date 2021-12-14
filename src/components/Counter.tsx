import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';

import * as styles from './Counter.styles';

export function Counter(): React.ReactElement {
  const [num, setNum] = useState<number>(1);
  const handleOnClick = () => setNum(prev => prev + 1);
  return (
    <styles.Container>
      <styles.SectionTitle>This component is shared</styles.SectionTitle>
      <TouchableOpacity onPress={handleOnClick}>
        <styles.ButtonText>Click Me</styles.ButtonText>
      </TouchableOpacity>
      <styles.NumberText>{num}</styles.NumberText>
    </styles.Container>
  );
}
