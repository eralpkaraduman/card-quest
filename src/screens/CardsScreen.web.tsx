import React from 'react';
import {TitleText} from '@components/TitleText';
import {Helmet} from 'react-helmet';
import {CardList} from '@components/CardList';

export function CardsScreen(): React.ReactElement {
  return (
    <>
      <Helmet>
        <title>Card Quest: Cards</title>
      </Helmet>
      <TitleText>Cards</TitleText>
      <CardList />
    </>
  );
}
