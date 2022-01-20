import styled from 'styled-components/native';
import {GameCardSize} from './GameCard.styles';

export const Container = styled.View<{size: GameCardSize}>`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlaceHolder = styled.View<{size: GameCardSize}>`
  width: ${({size}) => GameCardSize.getWidth(size)}px;
  height: ${({size}) => GameCardSize.getHeight(size)}px;
  border-radius: ${({size}) => size / 20}px;
  border-color: ${({theme}) => theme.colors.gray};
  border-width: 2px;
  border-style: dashed;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.main};
  margin-bottom: ${({theme}) => theme.dimensions.padding.small}px;
  font-size: 10px;
`;