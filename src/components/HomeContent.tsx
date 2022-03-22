import React from 'react';
import {BodyText} from './BodyText';
import {SubtitleText} from './SubtitleText';
import Icon_FA5 from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';
import {CQButton} from './CQButton';

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

      <BodyText>This video explains the gameplay in detail</BodyText>
      <BodyText>[Youtube Video Link](https://youtu.be/GNoZrr56GqA)</BodyText>

      <SubtitleText>Why was this made</SubtitleText>
      <BodyText>bisey</BodyText>
      <BodyText>[Link to blog post]</BodyText>

      <SubtitleText>Who made this</SubtitleText>
      <BodyText>bisey</BodyText>
      <BodyText>
        [Link to eralpkaraduman.com](https://eralpkaraduman.com)
      </BodyText>
    </>
  );
}
