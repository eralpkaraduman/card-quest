import React from 'react';
import {BodyText} from './BodyText';
import {SubtitleText} from './SubtitleText';
import Icon_FA5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import {CQButton} from './CQButton';
import {BodyTextWithHyperLinks} from './BodyTextWithHyperLinks';

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

interface HomeContent_Props {
  onNavigateToCardsScreen: () => void;
}

export function HomeContent({
  onNavigateToCardsScreen,
}: HomeContent_Props): React.ReactElement {
  return (
    <>
      <Logo />
      <BodyText>
        Welcome to card quest! This is a react-native-web experiment with a game
        in it. Game is an implementation of Donsol.
      </BodyText>

      <SubtitleText>What is donsol</SubtitleText>
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

      <CQButton onPress={onNavigateToCardsScreen}>
        <SubtitleText>See All Cards</SubtitleText>
      </CQButton>

      <BodyTextWithHyperLinks>
        It is open source on GitHub:
        https://github.com/eralpkaraduman/card-quest
      </BodyTextWithHyperLinks>

      <BodyTextWithHyperLinks>
        This video explains the game play in detail:
        https://youtu.be/GNoZrr56GqA
      </BodyTextWithHyperLinks>

      <BodyTextWithHyperLinks>
        Created by Eralp Karaduman (except the game design):
        https://eralpkaraduman.com
      </BodyTextWithHyperLinks>
    </>
  );
}
