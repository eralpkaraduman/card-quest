import {Text} from 'react-native';
import styled from 'styled-components/native';
import Icon from '@/icons.web';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  border-right-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.secondary};
  padding: ${({theme}) => theme.dimensions.padding.large}px;
  gap: ${({theme}) => theme.dimensions.padding.medium}px;
  background-color: ${({theme}) => theme.colors.background};
  z-index: 1;
`;

const createButtonIcon = (pack: any, name: string, size: number) =>
  styled(pack).attrs(({theme, $active}) => ({
    solid: true,
    size,
    color: $active ? theme.colors.main : theme.colors.secondary,
    name,
  }))<{$active: boolean}>`
    display: flex;
    align-items: center;
  `;

export type IconType = ReturnType<typeof createButtonIcon>;

export const DungeonIcon = createButtonIcon(
  Icon.FontAwesome5Icon,
  'dungeon',
  18,
);
export const ScrollIcon = createButtonIcon(Icon.FontAwesome5Icon, 'scroll', 18);
export const SwordIcon = createButtonIcon(
  Icon.MaterialCommunityIcon,
  'sword',
  26,
);

// We don't use `styled.Text` so we can get the redeclared Text with href prop, see global.d.ts
export const Button = styled(Text).attrs({accessibilityRole: 'link'})<{
  $active: boolean;
}>`
  display: flex;
  justify-content: space-between;
  color: ${({theme, $active}) =>
    $active ? theme.colors.main : theme.colors.secondary};
  font-size: ${({theme}) => theme.fontSize.menuItem};
  min-width: 98px;
`;
