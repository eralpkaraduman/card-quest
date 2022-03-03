import styled, {css} from 'styled-components/native';
import {GameCard} from '@components/GameCard';
import {Container as GameCardContainer} from '@components/GameCard.styles';
import {ElementType, createElement} from 'react';
import {View} from 'react-native';

export const StyledFlatList: ElementType = styled.FlatList.attrs(({theme}) => ({
  contentContainerStyle: {
    padding: theme.dimensions.padding.small,
    justifyContent: 'space-between',
  },
}))``;

export const StyledGameCard = styled(GameCard)<{numColumns: number}>`
  ${({numColumns}) => numColumns > 1 && css``};
  margin: ${({theme}) => theme.dimensions.padding.small};
`;

export const EmptyCard = styled(GameCardContainer).attrs({
  disabled: true,
  children: createElement(View),
})<{
  numColumns: number;
  size: number;
}>`
  ${({numColumns}) => numColumns > 1 && css``};
  margin: ${({theme}) => theme.dimensions.padding.small};
  opacity: 0.3;
`;
