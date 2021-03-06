import React from 'react';
import styled from 'styled-components/native';
import {HeadTitle} from '@hooks/useHead.web';

import {TitleText} from '@components/TitleText';
import {HomeContent} from '@components/HomeContent';

const PageTitleText = styled(TitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

export function HomeScreen(): React.ReactElement {
  return (
    <>
      <HeadTitle>Card Quest: Home</HeadTitle>
      <PageTitleText>Card Quest</PageTitleText>
      <HomeContent />
    </>
  );
}
