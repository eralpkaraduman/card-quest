import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import Icon from '@/icons.web';
import {Link} from 'react-router-dom';
import {useMatch} from 'react-router-dom';

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

export function Button({
  to,
  children,
}: React.PropsWithChildren<{to: string}>): React.ReactElement {
  const theme = useTheme();
  const match = useMatch(`${to}/*`);
  return React.createElement(
    Link,
    {
      to,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        color: match ? theme.colors.main : theme.colors.secondary,
        fontSize: theme.fontSize.menuItem,
        minHeight: `${30}px`,
        textDecoration: 'none',
      },
    },
    React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {$active: match});
      } else {
        return child;
      }
    }),
  );
}
