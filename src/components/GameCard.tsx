import React, {ReactElement} from 'react';
import styled, {css} from 'styled-components/native';
import {DonsolCard} from '@controllers/DonsolCard';

const WHRatio: number = 2.5 / 3.5;

export enum GameCardSize {
  medium = 120,
}

const Container = styled.View<{size: GameCardSize}>`
  ${({size, theme}) => css`
    display: flex;
    border-radius: ${size / 20}px;
    border-color: ${theme.colors.main};
    border-width: 2px;
    border-style: solid;
    width: ${size * WHRatio}px;
    height: ${size}px;
    padding: ${theme.dimensions.padding.xsmall}px;
  `};
`;

const TitleText = styled.Text`
  color: ${({theme}) => theme.colors.main};
`;

export interface GameCard_Props {
  donsolCard: DonsolCard;
  size: GameCardSize;
}

export function GameCard({donsolCard, size}: GameCard_Props): ReactElement {
  return (
    <Container size={size}>
      <TitleText>{donsolCard.toString()}</TitleText>
    </Container>
  );
}
