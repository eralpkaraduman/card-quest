import React, {useCallback} from 'react';
import {TitleText} from '@components/TitleText';
import styled from 'styled-components/native';
import {CardList, CardWrapper} from '@components/CardList';
import {HeadTitle} from '@hooks/useHead.web';
import {Link, Outlet, useLocation} from 'react-router-dom';

const PageTitleText = styled(TitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
`;

const LinkStyle = {
  textDecoration: 'none',
};

export function CardsScreen(): React.ReactElement {
  const location = useLocation();

  const renderCardWrapper = useCallback<CardWrapper>(
    ({children, cardId}) => (
      <Link
        style={LinkStyle}
        to={cardId}
        state={{backgroundLocation: location}}
      >
        {children}
      </Link>
    ),
    [location],
  );

  return (
    <>
      <HeadTitle>Card Quest: All Cards</HeadTitle>
      <Outlet />
      <PageTitleText>All Cards</PageTitleText>
      <CardList cardWrapper={renderCardWrapper} />
    </>
  );
}
