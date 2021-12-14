import React from 'react';
import {CardList} from '@components/CardList';

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

export function CardsScreen(): React.ReactElement {
  return (
    <div style={styles.container}>
      <h1 style={styles.titleText}>Cards</h1>
      <CardList />
    </div>
  );
}
