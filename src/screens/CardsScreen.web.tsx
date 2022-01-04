import React from 'react';
import styled, {css, useTheme} from 'styled-components/native';
import {GameCardSize} from '@components/GameCard';
import {useWindowDimensions} from 'react-native';
import {CardList} from '@components/CardList';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  ${({theme}) => css`
    gap: ${theme.dimensions.padding.medium}px;
    padding: ${theme.dimensions.padding.medium}px;
  `}
`;

export function CardsScreen(): React.ReactElement {
  const {width} = useWindowDimensions();
  const {getWindowSize} = useTheme();
  const size = getWindowSize(width);

  return (
    <Container>
      {size.xsmall && (
        <CardList numColumns={2} cardSize={GameCardSize.medium} />
      )}
      {size.small && <CardList numColumns={3} cardSize={GameCardSize.medium} />}
      {size.medium && <CardList numColumns={4} cardSize={GameCardSize.large} />}
      {size.large && <CardList numColumns={6} cardSize={GameCardSize.large} />}
      {size.xlarge && <CardList numColumns={8} cardSize={GameCardSize.large} />}
    </Container>
  );
}
