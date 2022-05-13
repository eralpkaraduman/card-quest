import React, {ReactElement, useCallback, useMemo} from 'react';
import {GameEvent, useGameHistory} from '@controllers/GameControllerProvider';
import styled from 'styled-components/native';
import {BodyText} from './BodyText';
import {DonsolEventDescriptor} from '@controllers/DonsolEventDescriptor';
import {useBattleLogScreenLinkText, useGameScreenLinkText} from './LinkText';

const TempDebugContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.dimensions.padding.medium};
  padding: ${({theme}) => theme.dimensions.padding.medium};
`;

const HistoryContainer = styled(TempDebugContainer)`
  max-width: 500px;
`;

interface BattleLogView_Props {
  numVisibleLines?: number;
  shouldShowLinkToGameScreen?: boolean;
}

export function BattleLogView({
  numVisibleLines = -1,
  shouldShowLinkToGameScreen = false,
}: BattleLogView_Props): React.ReactElement {
  const GameScreenLink = useGameScreenLinkText();
  const BattleLogScreenLink = useBattleLogScreenLinkText();
  const history = useGameHistory();

  const shouldHideLines = numVisibleLines > 0;
  const visibleHistory = useMemo(() => {
    return shouldHideLines ? history.slice(0, numVisibleLines) : history;
  }, [history, numVisibleLines, shouldHideLines]);

  const numInvisibleLines = history.length - visibleHistory.length;

  const renderEventLogItem = useCallback(
    (gameEvent, index) => {
      const order = history.length - index;
      return (
        <GameEventLogItem
          key={`${gameEvent.kind}-${order}`}
          gameEvent={gameEvent}
          order={order}
        />
      );
    },
    [history],
  );

  const renderLinkToGameScreen = () => {
    return (
      <BodyText>
        {history.length > 0 ? '' : 'Nothing happened yet. '}Go to{' '}
        <GameScreenLink>Game Screen</GameScreenLink> to play!
      </BodyText>
    );
  };

  return (
    <HistoryContainer>
      {visibleHistory.map(renderEventLogItem)}
      {numInvisibleLines > 0 && shouldHideLines && (
        <BodyText>
          Go to <BattleLogScreenLink>Battle Log Screen</BattleLogScreenLink> To
          see earlier events.
        </BodyText>
      )}
      {shouldShowLinkToGameScreen && renderLinkToGameScreen()}
    </HistoryContainer>
  );
}

interface GameEventLogItem_Props {
  gameEvent: GameEvent;
  order: number;
}

function GameEventLogItem({
  gameEvent,
  order,
}: GameEventLogItem_Props): ReactElement {
  const {description} = new DonsolEventDescriptor(gameEvent);
  return (
    <BodyText>
      {order}. {description}
    </BodyText>
  );
}
