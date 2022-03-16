import React, {useState} from 'react';
import {useGameController} from '@controllers/GameControllerProvider';
import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';
import {GameRoom} from './GameRoom';
import {PlayerStatus} from './PlayerStatus';
import {BattleLogView} from './BattleLogView';

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

const TempDebugContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.dimensions.padding.medium};
  padding: ${({theme}) => theme.dimensions.padding.medium};
`;

const DebugText = styled.Text`
  color: white;
`;

const TempDebugUiContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: ${({theme}) => theme.dimensions.padding.medium};
  padding: ${({theme}) => theme.dimensions.padding.medium};
`;

interface GameView_Props {
  onNavigateToBattleLog: () => void;
}

export function GameView({
  onNavigateToBattleLog,
}: GameView_Props): React.ReactElement {
  const game = useGameController();

  const [numCardsInDeck, setNumCardsInDeck] = useState<number>(game.deckCount);
  const [canEnterRoom, setCanEnterRoom] = React.useState<boolean>(
    game.canAdvance,
  );
  const [canFlee, setCanFlee] = React.useState<boolean>(game.canFlee);
  const [roomCount, setRoomCount] = React.useState<number>(game.roomCount);

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
        setCanEnterRoom(game.canAdvance);
        setCanFlee(game.canFlee);
      },
      onHistoryUpdated() {
        setRoomCount(game.roomCount);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  return (
    <Container>
      <PlayerStatus />
      <GameRoom />
      <TempDebugUiContainer>
        <TempDebugContainer>
          <DebugText>{`Deck: ${numCardsInDeck}`}</DebugText>
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
      </TempDebugUiContainer>
      <BattleLogView
        numVisibleLines={3}
        onShowMorePressed={onNavigateToBattleLog}
      />
    </Container>
  );
}
