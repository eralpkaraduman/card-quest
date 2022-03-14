import React, {useMemo} from 'react';
import {useGameHistory} from '@controllers/GameControllerProvider';
import styled from 'styled-components/native';
import {BodyText} from './BodyText';
import {TouchableHighlight} from 'react-native';
import {SubtitleText} from './SubtitleText';

interface BattleLogView_Props {
  tail?: number;
  onShowMorePressed?: () => void;
}

const TempDebugContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.dimensions.padding.medium};
  padding: ${({theme}) => theme.dimensions.padding.medium};
`;

const HistoryContainer = styled(TempDebugContainer)`
  max-width: 500px;
`;

export function BattleLogView({
  tail = -1,
  onShowMorePressed,
}: BattleLogView_Props): React.ReactElement {
  const history = useGameHistory();

  const shouldTail = tail > 0;
  const tailedHistory = useMemo(() => {
    return shouldTail ? history.slice(0, tail) : history;
  }, [history, tail, shouldTail]);

  return (
    <HistoryContainer>
      {tailedHistory.map((event, index) => (
        <BodyText key={`${event.kind}-${index}`}>
          {JSON.stringify(event)}
        </BodyText>
      ))}
      {shouldTail && (
        <TouchableHighlight onPress={onShowMorePressed}>
          <SubtitleText>Show More...</SubtitleText>
        </TouchableHighlight>
      )}
    </HistoryContainer>
  );
}
