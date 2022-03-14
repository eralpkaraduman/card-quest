import React, {useMemo} from 'react';
import {useGameHistory} from '@controllers/GameControllerProvider';
import styled from 'styled-components/native';
import {BodyText} from './BodyText';
import {TouchableHighlight} from 'react-native';
import {SubtitleText} from './SubtitleText';

interface BattleLogView_Props {
  numLines?: number;
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
  numLines = -1,
  onShowMorePressed,
}: BattleLogView_Props): React.ReactElement {
  const history = useGameHistory();

  const shouldHideLines = numLines > 0;
  const visibleHistory = useMemo(() => {
    return shouldHideLines ? history.slice(0, numLines) : history;
  }, [history, numLines, shouldHideLines]);

  return (
    <HistoryContainer>
      {visibleHistory.map((event, index) => (
        <BodyText key={`${event.kind}-${index}`}>
          {JSON.stringify(event)}
        </BodyText>
      ))}
      {shouldHideLines && (
        <TouchableHighlight onPress={onShowMorePressed}>
          <SubtitleText>Show More...</SubtitleText>
        </TouchableHighlight>
      )}
    </HistoryContainer>
  );
}
