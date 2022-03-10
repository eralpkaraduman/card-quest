import React from 'react';
import {TitleText} from '@components/TitleText';
import {CardList} from '@components/CardList';
import styled from 'styled-components/native';
import {HeadTitle} from '@hooks/useHead.web';

const PageTitleText = styled(TitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

export function CardsScreen(): React.ReactElement {
  return (
    <>
      <HeadTitle>Card Quest: All Cards</HeadTitle>
      <PageTitleText>All Cards</PageTitleText>
      <CardList />
    </>
  );
}
