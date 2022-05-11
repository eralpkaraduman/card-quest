import React, {ReactElement, useCallback, useMemo} from 'react';
import {GameEvent, useGameHistory} from '@controllers/GameControllerProvider';
import styled from 'styled-components/native';
import {BodyText} from './BodyText';
import {Platform} from 'react-native';
import {DonsolEventDescriptor} from '@controllers/DonsolEventDescriptor';
import {LinkText} from './LinkText';

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
  onShowMorePressed?: () => void;
}

export function BattleLogView({
  numVisibleLines = -1,
  onShowMorePressed,
}: BattleLogView_Props): React.ReactElement {
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

  return (
    <HistoryContainer>
      {visibleHistory.map(renderEventLogItem)}
      {numInvisibleLines > 0 && shouldHideLines && (
        <BodyText>
          Go to{' '}
          <LinkText
            href={Platform.OS === 'web' ? '/battle-log' : undefined}
            onPress={Platform.OS !== 'web' ? onShowMorePressed : undefined}
          >
            Battle Log Screen
          </LinkText>{' '}
          To see earlier events.
        </BodyText>
      )}
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
