import React from 'react';
import GameView from '@components/GameView';

const styles: {[key in string]: React.CSSProperties} = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
  },
};

export function HomeScreen(): React.ReactElement {
  return (
    <div style={styles.container}>
      <h1 style={styles.titleText}>Home</h1>
      <GameView />
    </div>
  );
}
