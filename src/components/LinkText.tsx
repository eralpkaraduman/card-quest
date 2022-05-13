import React, {PropsWithChildren, ReactElement, ReactNode} from 'react';
import {BodyText} from './BodyText';
import styled from 'styled-components/native';
import {Linking, Platform} from 'react-native';
import {Link} from 'react-router-dom';
import {isOutgoingLink} from '@/utils/isOutgoingLink';
import {useNavigation} from '@react-navigation/native';
import {
  BattleLogScreenNavigationProps,
  CardsScreenNavigationProps,
  GameScreenNavigationProps,
  HomeScreenNavigationProps,
} from '@/navigationProps';

const StyledText = styled(BodyText)`
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.white};
`;

type StyledLink_Props = React.PropsWithChildren<{
  to: string;
}>;

export function StyledLink({
  to,
  children,
}: StyledLink_Props): React.ReactElement {
  return React.createElement(Link, {to}, children);
}

type LinkText_Props = {
  children: ReactNode;
  href?: string;
  onPress?: () => void;
};

export function LinkText({
  children,
  href,
  onPress,
}: LinkText_Props): React.ReactElement {
  async function handleOnPress(): Promise<void> {
    if (href && (await Linking.canOpenURL(href))) {
      Linking.openURL(href);
    } else {
      onPress?.();
    }
  }

  if (Platform.OS === 'web' && href) {
    if (isOutgoingLink(href)) {
      return (
        <a href={href}>
          <StyledText>{children}</StyledText>
        </a>
      );
    }
    return (
      <StyledLink to={href}>
        <StyledText>{children}</StyledText>
      </StyledLink>
    );
  } else {
    return <StyledText onPress={handleOnPress}>{children}</StyledText>;
  }
}

// TODO: extend this to type check params
type GenericNavigationProps = {
  navigate: (tab: string, params: {screen: string}) => void;
};

function useScreenLinkText<P extends GenericNavigationProps>(
  href: string,
  tab: string,
  screen: string,
) {
  if (Platform.OS === 'web') {
    return function WebScreenLinkText({
      children,
    }: PropsWithChildren<unknown>): ReactElement {
      return <LinkText href={href}>{children}</LinkText>;
    };
  }
  return function NativeScreenLinkText({
    children,
  }: PropsWithChildren<unknown>): ReactElement {
    const navigation = useNavigation<P>();
    return (
      <LinkText onPress={() => navigation.navigate(tab, {screen})}>
        {children}
      </LinkText>
    );
  };
}

export const useCardsScreenLinkText = () =>
  useScreenLinkText<CardsScreenNavigationProps>(
    '/cards',
    'CardsTab',
    'CardsScreen',
  );

export const useHomeScreenLinkText = () =>
  useScreenLinkText<HomeScreenNavigationProps>(
    '/home',
    'HomeTab',
    'HomeScreen',
  );

export const useBattleLogScreenLinkText = () =>
  useScreenLinkText<BattleLogScreenNavigationProps>(
    '/battle-log',
    'BattleLogTab',
    'BattleLogScreen',
  );

export const useGameScreenLinkText = () =>
  useScreenLinkText<GameScreenNavigationProps>(
    '/game',
    'GameTab',
    'GameScreen',
  );
