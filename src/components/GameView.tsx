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
  const [health, setHealth] = React.useState<number>(game.health);
  const [shieldCard, setShieldCard] = React.useState<DonsolCard | undefined>(
    game.shield,
  );
  const [history, setHistory] = React.useState<GameEvent[]>(game.history);
  const [canFlee, setCanFlee] = React.useState<boolean>(game.canFlee);
  const [roomCount, setRoomCount] = React.useState<number>(game.roomCount);
  const [lastBlockedMonster, setLastBlockedMonster] = React.useState<
    DonsolCard | undefined
  >(game.lastBlockedMonster);
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
      onHealthChange() {
        setHealth(game.health);
      },
      onShieldChange() {
        setShieldCard(game.shield);
      },
      onHistoryUpdated() {
        setHistory(game.history);
        setRoomCount(game.roomCount);
        setLastBlockedMonster(game.lastBlockedMonster);
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
      <GameRoom />
      <Room>
        <CardSlot size={cardSize} title="Last Played" card={lastPlayedCard} />
        <CardSlot size={cardSize} title="Shield" card={shieldCard} />
        <CardSlot
          size={cardSize}
          title="Last Blocked"
          card={lastBlockedMonster}
        />
      </Room>
      <Room>
        <TempDebugContainer>
          <DebugText>{`Deck: ${numCardsInDeck}`}</DebugText>
          <DebugText>{`State: ${gameState}`}</DebugText>
          <DebugText>{`Health: ${health}`}</DebugText>
          <DebugText>{`Shield: ${shieldCard?.effect ?? 0}`}</DebugText>
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
