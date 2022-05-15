import React from 'react';
import {BodyText} from './BodyText';
import {SubtitleText} from './SubtitleText';
import Icon_FA5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import {ScreenLinkText} from './ScreenLinkText';
import {LinkText} from './LinkText';

const Logo = styled(Icon_FA5).attrs(({theme}) => ({
  size: 75,
  color: theme.colors.main,
  name: 'dungeon',
}))`
  width: 100%;
  text-align: center;
  padding: ${({theme}) => theme.dimensions.padding.medium};
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

export function HomeContent(): React.ReactElement {
  return (
    <>
      <Logo />

      <BodyText>
        Welcome to card quest! This is a react-native-web experiment with a game
        in it. Game is an implementation of the card game Donsol.Head over to{' '}
        <ScreenLinkText tab="GameTab" screen="GameScreen">
          Game Screen
        </ScreenLinkText>
        to play it.
      </BodyText>

      <SubtitleText>About Donsol</SubtitleText>

      <BodyText>
        Donsol is a dungeon crawler card game played with a standard 54 card
        deck.
      </BodyText>

      <BodyText>
        Donsol, short for Dungeon Solitaire was designed by John Eternal, during
        train jam in 2015.
      </BodyText>

      <BodyText>
        A standard deck of 54 cards, jokers included, is a dungeon. Shuffle the
        deck and draw 4 cards, display them before you, this is a room. A room
        ends when all the cards are folded.
      </BodyText>

      <BodyText>
        ♥︎ Heart cards are potions, ♦ diamonds are shields, ♣ clubs and ♠ spades
        are monsters. See card screen for each of their rules.
      </BodyText>

      <BodyText>
        Go to{' '}
        <ScreenLinkText screen="CardsScreen" tab="CardsTab">
          Cards Screen
        </ScreenLinkText>{' '}
        To see all cards.
      </BodyText>

      <BodyText>
        It is open source on{' '}
        <LinkText href="https://github.com/eralpkaraduman/card-quest">
          GitHub
        </LinkText>
        .
      </BodyText>

      <BodyText>
        <LinkText href="https://youtu.be/GNoZrr56GqA">This video</LinkText>{' '}
        explains the game play in detail.
      </BodyText>

      <BodyText>
        Created by{' '}
        <LinkText href="https://eralpkaraduman.com">Eralp Karaduman</LinkText>{' '}
        (except the game design)
      </BodyText>
    </>
  );
}
