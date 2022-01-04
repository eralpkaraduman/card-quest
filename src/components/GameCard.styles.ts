import styled, {css} from 'styled-components/native';
import {DonsolCardKind} from '@controllers/DonsolCard';
import WebIcon from '@/icons.web';

const suitIconSize = 17;

export enum GameCardSize {
  medium = 120,
  large = 190,
}

export namespace GameCardSize {
  const WHRatio: number = 2.5 / 3.5;
  export function getWidth(size: GameCardSize) {
    return WHRatio * size;
  }
  export function getHeight(size: GameCardSize) {
    return size;
  }
}

export const MaterialSuitIcon = styled(WebIcon.MaterialCommunityIcon).attrs(
  ({theme, color}) => ({
    size: suitIconSize,
    color: theme.colors[color],
  }),
)``;

export const FontAwesomeSuitIcon = styled(WebIcon.FontAwesome5Icon).attrs(
  ({theme, color}) => ({
    size: suitIconSize,
    solid: true,
    color: theme.colors[color],
  }),
)``;

export const CardKindIcon = styled(WebIcon.MaterialCommunityIcon).attrs(
  ({theme, kind}) => ({
    size: 30,
    color: theme.colors[kind],
  }),
)<{kind: DonsolCardKind}>``;

export const Container = styled.View<{size: GameCardSize}>`
  ${({size, theme}) => css`
    display: flex;
    border-radius: ${size / 20}px;
    border-color: ${theme.colors.gray};
    border-width: 2px;
    border-style: solid;
    height: ${GameCardSize.getHeight(size)}px;
    width: ${GameCardSize.getWidth(size)}px;
    padding: ${theme.dimensions.padding.xsmall}px;
  `};
`;

export const CardEffectValueText = styled.Text<{
  kind: DonsolCardKind;
}>`
  color: ${({theme, kind}) => theme.colors[kind]};
  font-size: 17px;
  font-weight: bold;
`;

export const CardContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({theme}) => theme.dimensions.padding.xsmall}px;
  padding-bottom: ${({theme}) => theme.dimensions.padding.small}px;
`;

export const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${({theme}) => theme.dimensions.padding.small}px;
  padding-left: ${({theme}) => theme.dimensions.padding.small}px;
  padding-top: ${({theme}) => theme.dimensions.padding.small}px;
`;

export const ValueText = styled.Text`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 21px;
  font-weight: bold;
  margin-left: ${({theme}) => theme.dimensions.padding.xsmall}px;
`;
