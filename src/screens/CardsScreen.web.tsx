import React from 'react';
import styled, {css} from 'styled-components/native';
import {Card, cardList} from '@controllers/Deck';
import {GameCard, GameCardSize} from '@components/GameCard';
import {DonsolCard} from '@controllers/DonsolCard';
const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${({theme}) => css`
    gap: ${theme.dimensions.padding.medium}px;
    padding: ${theme.dimensions.padding.medium}px;
  `}
`;

export function CardsScreen(): React.ReactElement {
  const renderCard = (card: Card) => {
    const donsolCard = new DonsolCard(card);
    return (
      <GameCard
        donsolCard={donsolCard}
        size={GameCardSize.medium}
        key={donsolCard.toString()}
      />
    );
  };
  return <Container>{cardList.map(renderCard)}</Container>;
}
