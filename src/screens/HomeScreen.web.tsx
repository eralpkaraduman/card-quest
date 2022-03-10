import {HeadTitle} from '@hooks/useHead.web';
import React from 'react';

const styles: {[key in string]: React.CSSProperties} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
  },
};

export function HomeScreen(): React.ReactElement {
  return (
    <div style={styles.container}>
      <HeadTitle>Card Quest: Home</HeadTitle>
      <h1 style={styles.titleText}>Home</h1>
    </div>
  );
}
