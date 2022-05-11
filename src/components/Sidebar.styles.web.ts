import React from 'react';
import styled, {css, useTheme} from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // TODO: rename to MaterialCommunityIcon
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Link} from 'react-router-dom';
import {useMatch} from 'react-router-dom';
import {SubtitleText} from './SubtitleText';

export const Container = styled.View<{
  width: number;
  compact: boolean;
}>`
  display: flex;
  flex-direction: column;
  ${({theme, compact}) => {
    const padding = compact ? 0 : theme.dimensions.padding.large;
    return css`
      padding-top: ${theme.dimensions.padding.large};
      padding-left: ${padding};
      padding-right: ${padding};
    `;
  }}
  background-color: ${({theme}) => theme.colors.darkGray};
  z-index: 1;
  position: fixed;
  width: ${({width}) => width}px;
  min-height: 100%;
  align-items: ${({compact}) => (compact ? 'center' : 'space-between')};
`;

const createButtonIcon =
  (
    iconPack: typeof FontAwesome5Icon | typeof EntypoIcon,
    name: string,
    size: number,
  ) =>
  ({$active}: {$active?: boolean}): React.ReactElement => {
    const theme = useTheme();
    return React.createElement(iconPack, {
      name,
      size,
      color: $active ? theme.colors.main : theme.colors.secondary,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '26px',
      },
    });
  };

export const DungeonIcon = createButtonIcon(FontAwesome5Icon, 'dungeon', 18);
export const ScrollIcon = createButtonIcon(FontAwesome5Icon, 'scroll', 18);
export const SwordIcon = createButtonIcon(MaterialCommunityIcons, 'sword', 26);
export const CardIcon = createButtonIcon(EntypoIcon, 'documents', 26);

export function StyledLink({
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
        minHeight: 34,
        alignItems: 'center',
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
  display: flex;
  text-align: right;
  padding-left: ${({theme}) => theme.dimensions.padding.large};
  color: ${({theme, $active}) =>
    $active ? theme.colors.main : theme.colors.secondary};
`;
