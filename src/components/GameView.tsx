import React, {useState} from 'react';
import {
  useGameController,
  GameEvent,
} from '@controllers/GameControllerProvider';
import {GameCardSize} from './GameCard.styles';
import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';
import {GameState} from '@controllers/GameController';
import {CardSlot} from './CardSlot';
import {DonsolCard} from '@controllers/DonsolCard';
import {GameRoom} from './GameRoom';
import {useWindowAttributes} from '@/utils';
import {PlayerStatus} from './PlayerStatus';

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

  const [numCardsInDeck, setNumCardsInDeck] = useState<number>(game.deckCount);
  const [gameState, setGameState] = React.useState<GameState>(game.state);
  const [canEnterRoom, setCanEnterRoom] = React.useState<boolean>(
    game.canAdvance,
  );
  const [history, setHistory] = React.useState<GameEvent[]>(game.history);
  const [canFlee, setCanFlee] = React.useState<boolean>(game.canFlee);
  const [roomCount, setRoomCount] = React.useState<number>(game.roomCount);
  const [lastPlayedCard, setLastPlayedCard] = React.useState<
    DonsolCard | undefined
  >(game.lastPlayedCard);

  const canReset = true;

  React.useEffect(() => {
    const removeEventListener = game.addEventListener({
      onDeckUpdated() {
        setNumCardsInDeck(game.deckCount);
      },
      onRoomUpdated() {
        setCanFlee(game.canFlee);
        setCanEnterRoom(game.canAdvance);
      },
      onStateChange() {
        setGameState(game.state);
        setCanEnterRoom(game.canAdvance);
        setCanFlee(game.canFlee);
      },
      onHistoryUpdated() {
        setHistory(game.history);
        setRoomCount(game.roomCount);
        setLastPlayedCard(game.lastPlayedCard);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  const {narrow} = useWindowAttributes();
  const cardSize = narrow ? GameCardSize.medium : GameCardSize.large;

  return (
    <Container>
      <PlayerStatus />
      <GameRoom />
      <Room>
        <CardSlot size={cardSize} title="Last Played" card={lastPlayedCard} />
      </Room>
      <Room>
        <TempDebugContainer>
          <DebugText>{`Deck: ${numCardsInDeck}`}</DebugText>
          <DebugText>{`State: ${gameState}`}</DebugText>
          <DebugText>{`Room: ${roomCount}`}</DebugText>
        </TempDebugContainer>
        <TempDebugContainer>
          {canReset && (
            <TouchableHighlight onPress={() => game.reset()}>
              <DebugText>[ Reset ]</DebugText>
            </TouchableHighlight>
          )}
          {canFlee && (
            <TouchableHighlight onPress={() => game.advance(true)}>
              <DebugText>[ Flee / Skip ] </DebugText>
            </TouchableHighlight>
          )}
          {canEnterRoom && (
            <TouchableHighlight onPress={() => game.advance(false)}>
              <DebugText>[ Advance ]</DebugText>
            </TouchableHighlight>
          )}
        </TempDebugContainer>
        <TempDebugContainer>
          {history.map((event, index) => (
            <DebugText key={`${event.kind}-${index}`}>
              {JSON.stringify(event)}
            </DebugText>
          ))}
        </TempDebugContainer>
      </Room>
    </Container>
  );
}
