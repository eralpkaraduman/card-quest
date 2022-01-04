import React from 'react';
import styled, {css, useTheme} from 'styled-components/native';
import {Card, cardList} from '@controllers/Deck';
import {GameCard, GameCardSize} from '@components/GameCard';
import {DonsolCard} from '@controllers/DonsolCard';
import {useWindowDimensions} from 'react-native';

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
  const cardSize =
    size.small || size.xsmall ? GameCardSize.large : GameCardSize.medium;

  const renderCard = (card: Card, index: number) => {
    const donsolCard = new DonsolCard(card);
    return (
      <GameCard
        donsolCard={donsolCard}
        size={cardSize}
        key={donsolCard.toString() + index}
      />
    );
  };
  return <Container>{cardList.map(renderCard)}</Container>;
}
