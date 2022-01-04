import styled from 'styled-components/native';
import {GameCard} from '@components/GameCard';
import {Container as GameCardContainer} from '@components/GameCard.styles';

export const StyledFlatList = styled.FlatList.attrs(({theme}) => ({
  contentContainerStyle: {
    justifyContent: 'space-between',
    padding: theme.dimensions.padding.small,
  },
}))``;

export const StyledGameCard = styled(GameCard)<{numColumns: number}>`
  flex: ${({numColumns}) => 1 / numColumns};
  margin: ${({theme}) => theme.dimensions.padding.small}px;
`;

export const EmptyCard = styled(GameCardContainer)<{
  numColumns: number;
  size: number;
}>`
  flex: ${({numColumns}) => 1 / numColumns};
  margin: ${({theme}) => theme.dimensions.padding.small}px;
  opacity: 0.3;
`;
