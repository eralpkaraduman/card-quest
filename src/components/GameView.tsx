import React, {useState} from 'react';
import {
  useGameController,
  CardStack,
  Shield,
} from '@controllers/GameControllerProvider';
import {GameCardSize} from './GameCard.styles';
import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';
import {GameState} from '@controllers/GameController';
import {CardSlot} from './CardSlot';
import {DonsolCard, DonsolCardKind} from '@controllers/DonsolCard';

const Container = styled.View`
  display: flex;
  flex-direction: column;
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

const Room = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${({theme}) => theme.dimensions.padding.medium}px;
  padding: ${({theme}) => theme.dimensions.padding.medium}px;
`;

export function GameView(): React.ReactElement {
  const game = useGameController();
  const [roomCards, setRoomCards] = React.useState<CardStack>(game.room);
  const [discardPile, setDiscardPile] = React.useState<CardStack>(
    game.discardPile,
  );
  const [numCardsInDeck, setNumCardsInDeck] = useState<number>(game.deckCount);
  const [gameState, setGameState] = React.useState<GameState>(game.state);
  const [canEnterRoom, setCanEnterRoom] = React.useState<boolean>(
    game.canEnterRoom,
  );
  const [health, setHealth] = React.useState<number>(game.health);
  const [shieldCard, setShieldCard] = React.useState<Shield>(game.shield);
  const canReset = true;

  React.useEffect(() => {
    const removeEventListener = game.addEventListener({
      onEnterRoom(value) {
        setRoomCards(value);
      },
      onDeckUpdated(value) {
        setNumCardsInDeck(value);
      },
      onRoomUpdated(value) {
        setRoomCards(value);
      },
      onStateChange(updatedState, updatedCanEnterRoom) {
        setGameState(updatedState);
        setCanEnterRoom(updatedCanEnterRoom);
      },
      onHealthChange(value) {
        setHealth(value);
      },
      onShieldChange(value) {
        setShieldCard(value);
      },
      onDiscardPileUpdated(value) {
        setDiscardPile(value);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  const [prevDiscardedCard, topDiscardedCard] = discardPile.slice(-2);

  return (
    <Container>
      <Room>
        {Array(4)
          .fill(null)
          .map((_, slotOrder) => {
            const card = roomCards.find(
              ({roomOrder}) => roomOrder === slotOrder,
            );
            return (
              <CardSlot
                title={slotOrder + 1}
                card={card}
                size={GameCardSize.large}
                key={`room-slot-${slotOrder}`}
                onPress={card ? () => game.playCard(card) : undefined}
              />
            );
          })}
      </Room>
      <Room>
        <CardSlot
          size={GameCardSize.large}
          title="Discard"
          card={
            (topDiscardedCard?.kind === DonsolCardKind.shield
              ? prevDiscardedCard
              : topDiscardedCard) as DonsolCard
          }
        />
        <CardSlot
          size={GameCardSize.large}
          title="Shield"
          card={shieldCard as DonsolCard}
        />
      </Room>
      <TempDebugContainer>
        <DebugText>{`Deck: ${numCardsInDeck}`}</DebugText>
        <DebugText>{`State: ${gameState}`}</DebugText>
        <DebugText>{`Health: ${health}`}</DebugText>
        <DebugText>{`Shield: ${shieldCard?.effect ?? 0}`}</DebugText>
        {canReset && (
          <TouchableHighlight onPress={() => game.reset()}>
            <DebugText>Reset</DebugText>
          </TouchableHighlight>
        )}
        {canEnterRoom && (
          <TouchableHighlight onPress={() => game.enterRoom()}>
            <DebugText>Enter Room</DebugText>
          </TouchableHighlight>
        )}
      </TempDebugContainer>
    </Container>
  );
}
