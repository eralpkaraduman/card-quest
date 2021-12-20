import React, {ReactElement} from 'react';
import {View} from 'react-native';
import styled, {css} from 'styled-components/native';
import {DonsolCard} from '@controllers/DonsolCard';
import WebIcon from '@/icons.web';
import {CardSuit} from '@controllers/Deck';

const WHRatio: number = 2.5 / 3.5;

export enum GameCardSize {
  medium = 120,
  large = 190,
}

const Container = styled.View<{size: GameCardSize}>`
  ${({size, theme}) => css`
    display: flex;
    border-radius: ${size / 20}px;
    border-color: ${theme.colors.gray};
    border-width: 2px;
    border-style: solid;
    width: ${size * WHRatio}px;
    height: ${size}px;
    padding: ${theme.dimensions.padding.xsmall}px;
  `};
`;

export interface GameCard_Props {
  donsolCard: DonsolCard;
  size: GameCardSize;
}

const suitIconSize = 17;

const MaterialSuitIcon = styled(WebIcon.MaterialCommunityIcon).attrs(
  ({theme, color}) => ({
    size: suitIconSize,
    color: theme.colors[color],
  }),
)``;

const FontAwesomeSuitIcon = styled(WebIcon.FontAwesome5Icon).attrs(
  ({theme, color}) => ({
    size: suitIconSize,
    solid: true,
    color: theme.colors[color],
  }),
)``;

const CardSuitIconMap: {[key in CardSuit]: ReactElement} = {
  [CardSuit.clubs]: <MaterialSuitIcon name="cards-club" color="red" />,
  [CardSuit.spades]: <MaterialSuitIcon name="cards-spade" color="red" />,
  [CardSuit.hearts]: <MaterialSuitIcon name="cards-heart" color="main" />,
  [CardSuit.diamonds]: <MaterialSuitIcon name="cards-diamond" color="main" />,
  [CardSuit.joker]: (
    <FontAwesomeSuitIcon name="kiss-wink-heart" color="yellow" />
  ),
};

const CardHeader = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${({theme}) => theme.dimensions.padding.small}px;
  padding-left: ${({theme}) => theme.dimensions.padding.small}px;
  padding-top: ${({theme}) => theme.dimensions.padding.small}px;
`;

const ValueText = styled.Text`
  color: ${({theme}) => theme.colors.main};
  font-size: 21px;
  font-weight: bold;
  margin-left: ${({theme}) => theme.dimensions.padding.xsmall}px;
`;

export function GameCard({donsolCard, size}: GameCard_Props): ReactElement {
  const {suit, value} = donsolCard.card;
  return (
    <Container size={size}>
      <CardHeader>
        {CardSuitIconMap[suit]}
        {suit !== CardSuit.joker && <ValueText>{value}</ValueText>}
      </CardHeader>
    </Container>
  );
}
