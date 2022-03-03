import React from 'react';
import {TitleText} from '@components/TitleText';
import {Helmet} from 'react-helmet';
import {CardList} from '@components/CardList';
import styled from 'styled-components/native';

const PageTitleText = styled(TitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

export function CardsScreen(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>Card Quest: All Cards</title>
      </Helmet>
      <PageTitleText>All Cards</PageTitleText>
      <CardList />
    </>
  );
}
