import React, {useState} from 'react';
import {useGameController} from '@controllers/GameControllerProvider';
import {DonsolCard} from '@controllers/DonsolCard';
import {GameCard} from './GameCard';
import {GameCardSize} from './GameCard.styles';
import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';
import {GameState} from '@controllers/GameController';

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
  const game = useGameController();
  const [roomCards, setRoomCards] = React.useState<Readonly<DonsolCard[]>>(
    game.room,
  );
  const [numCardsInDeck, setNumCardsInDeck] = useState<number>(game.deckCount);
  const [gameState, setGameState] = React.useState<GameState>(game.state);
  const [canEnterRoom, setCanEnterRoom] = React.useState<boolean>(
    game.canEnterRoom,
  );

  React.useEffect(() => {
    const removeEventListener = game.addEventListener({
      onEnterRoom(cards) {
        setRoomCards(cards);
      },
      onDeckUpdated(count) {
        setNumCardsInDeck(count);
      },
      onRoomUpdated(cards) {
        setRoomCards(cards);
      },
      onStateChange(state) {
        setGameState(state);
        setCanEnterRoom(game.canEnterRoom);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

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
        <DebugText>{`State: ${gameState}`}</DebugText>
        {canEnterRoom && (
          <TouchableHighlight
            onPress={() => game.enterRoom()}
            disabled={!canEnterRoom}>
            <DebugText>Enter Room</DebugText>
          </TouchableHighlight>
        )}
      </TempDebugContainer>
    </Container>
  );
}
