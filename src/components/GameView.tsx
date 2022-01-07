import React from 'react';
import {useGameController} from '@controllers/GameControllerProvider';
import {DonsolCard} from '@controllers/DonsolCard';
import {GameCard} from './GameCard';
import {GameCardSize} from './GameCard.styles';
import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${({theme}) => theme.dimensions.padding.medium}px;
  padding: ${({theme}) => theme.dimensions.padding.medium}px;
`;

const TempDebugContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.dimensions.padding.medium}px;
  padding: ${({theme}) => theme.dimensions.padding.medium}px;
`;

const DebugText = styled.Text`
  color: white;
`;

export function GameView(): React.ReactElement {
  const gameController = useGameController();
  const [roomCards, setRoomCards] = React.useState<Readonly<DonsolCard[]>>(
    gameController.state.room,
  );
  const [numCardsInDeck, setNumcardsInDeck] = React.useState<number>(0);

  React.useEffect(() => {
    const removeEventListener = gameController.addEventListener({
      onEnterRoom(cards) {
        setRoomCards(cards);
      },
      onDeckUpdated(numCards) {
        setNumcardsInDeck(numCards);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [gameController]);
  return (
    <Container>
      {roomCards.map((roomCard, index) => (
        <GameCard
          onPress={() => console.log(roomCard.card)}
          donsolCard={roomCard}
          size={GameCardSize.large}
          key={`${roomCard.card}-${index}`}
        />
      ))}
      <TempDebugContainer>
        <DebugText>{`Deck: ${numCardsInDeck}`}</DebugText>
        <TouchableHighlight onPress={() => gameController.enterRoom()}>
          <DebugText>Enter Room</DebugText>
        </TouchableHighlight>
      </TempDebugContainer>
    </Container>
  );
}
