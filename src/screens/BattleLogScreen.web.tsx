import React, {ReactElement} from 'react';
import {HeadTitle} from '@hooks/useHead.web';
import styled from 'styled-components/native';
import {TitleText} from '@components/TitleText';
import {BattleLogView} from '@components/BattleLogView';

const PageTitleText = styled(TitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

export function BattleLogScreen(): ReactElement {
  return (
    <>
      <HeadTitle>Card Quest: Battle Report</HeadTitle>
      <PageTitleText>Battle Log</PageTitleText>
      <BattleLogView shouldShowLinkToGameScreen />
    </>
  );
}
