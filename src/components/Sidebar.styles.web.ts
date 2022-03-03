import React from 'react';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Link} from 'react-router-dom';
import {useMatch} from 'react-router-dom';
import {SubtitleText} from './SubtitleText';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: ${({theme}) => theme.dimensions.padding.large};
  background-color: ${({theme}) => theme.colors.darkGray};
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

export const DungeonIcon = createButtonIcon(FontAwesome5Icon, 'dungeon', 18);
export const ScrollIcon = createButtonIcon(FontAwesome5Icon, 'scroll', 18);
export const SwordIcon = createButtonIcon(MaterialCommunityIcons, 'sword', 26);

export function Button({
  to,
  children,
}: React.PropsWithChildren<{
  to: string;
}>): React.ReactElement {
  const active = useMatch(`${to}/*`);
  return React.createElement(
    Link,
    {
      to,
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: `${30}px`,
        textDecoration: 'none',
      },
    },
    // Pass down active state to children
    React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {$active: active});
      } else {
        return child;
      }
    }),
  );
}

export const ButtonTitle = styled(SubtitleText)<{$active?: boolean}>`
  padding-left: ${({theme}) => theme.dimensions.padding.large};
  color: ${({theme, $active}) =>
    $active ? theme.colors.main : theme.colors.secondary};
`;
