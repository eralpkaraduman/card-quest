import styled, {css} from 'styled-components/native';
import {DonsolCardKind} from '@controllers/DonsolCard';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const suitIconSize = 17;
export const SuitIcon_FA5 = styled(FontAwesome5Icon).attrs({
  size: suitIconSize,
  solid: true,
})``;
export const SuitIcon_MC = styled(MaterialCommunityIcon).attrs({
  size: suitIconSize,
})``;

interface CardKindIcon_Props {
  kind: DonsolCardKind;
}
export const CardKindIcon = styled(
  MaterialCommunityIcon,
).attrs<CardKindIcon_Props>(({theme, kind}) => ({
  size: 30,
  color: theme.colors[kind],
}))<CardKindIcon_Props>``;

const CardAspectRatio = 2.5 / 3.5;
export const Container = styled.View<{empty: boolean}>`
  ${({theme, empty}) => css`
    display: flex;
    width: 100%;
    aspect-ratio: ${CardAspectRatio};
    border-radius: ${theme.dimensions.borderRadius};
    border-color: ${theme.colors.gray};
    border-width: 2px;
    border-style: solid;
    padding: ${theme.dimensions.padding.xsmall};
    ${empty &&
    css`
      border-radius: ${theme.dimensions.borderRadius};
      border-color: ${theme.colors.gray};
      border-width: 2px;
      border-style: dashed;
    `};
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
  gap: ${({theme}) => theme.dimensions.padding.xsmall};
  padding-bottom: ${({theme}) => theme.dimensions.padding.small};
`;

export const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: ${({theme}) => theme.dimensions.padding.small};
  padding-left: ${({theme}) => theme.dimensions.padding.small};
  padding-top: ${({theme}) => theme.dimensions.padding.small};
`;

export const ValueText = styled.Text`
  color: ${({theme}) => theme.colors.secondary};
  font-size: 21px;
  font-weight: bold;
  margin-left: ${({theme}) => theme.dimensions.padding.xsmall};
`;
