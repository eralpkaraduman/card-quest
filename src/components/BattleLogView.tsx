import React, {useMemo} from 'react';
import {useGameHistory} from '@controllers/GameControllerProvider';
import styled from 'styled-components/native';
import {BodyText} from './BodyText';
import {TouchableHighlight} from 'react-native';
import {SubtitleText} from './SubtitleText';

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

  return (
    <HistoryContainer>
      {visibleHistory.map((event, index) => (
        <BodyText key={`${event.kind}-${index}`}>
          {JSON.stringify(event)}
        </BodyText>
      ))}
      {numInvisibleLines > 0 && shouldHideLines && (
        <TouchableHighlight onPress={onShowMorePressed}>
          <SubtitleText>Show More...</SubtitleText>
        </TouchableHighlight>
      )}
    </HistoryContainer>
  );
}
