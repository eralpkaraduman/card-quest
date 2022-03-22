import React from 'react';
import styled from 'styled-components/native';
import {HeadTitle} from '@hooks/useHead.web';

import {TitleText} from '@components/TitleText';
import {HomeContent} from '@components/HomeContent';
import {useNavigate} from 'react-router-dom';

const PageTitleText = styled(TitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

export function HomeScreen(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <HeadTitle>Card Quest: Home</HeadTitle>
      <PageTitleText>Card Quest</PageTitleText>
      <HomeContent onNavigateToCardsScreen={() => navigate('/cards')} />
    </>
  );
}
