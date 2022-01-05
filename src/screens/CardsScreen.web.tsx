import React from 'react';
import {useTheme} from 'styled-components/native';
import {GameCardSize} from '@components/GameCard';
import {useWindowDimensions} from 'react-native';
import {CardList} from '@components/CardList';

export function CardsScreen(): React.ReactElement {
  const {width} = useWindowDimensions();
  const {getWindowSize} = useTheme();
  const size = getWindowSize(width);

  return (
    <>
      {size.xsmall && (
        <CardList numColumns={3} cardSize={GameCardSize.medium} />
      )}
      {size.small && <CardList numColumns={4} cardSize={GameCardSize.medium} />}
      {size.medium && <CardList numColumns={4} cardSize={GameCardSize.large} />}
      {size.large && <CardList numColumns={6} cardSize={GameCardSize.large} />}
      {size.xlarge && <CardList numColumns={8} cardSize={GameCardSize.large} />}
    </>
  );
}
