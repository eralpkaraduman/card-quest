import React from 'react';
import {useParams} from 'react-router-dom';
import {CardDetailView} from './CardDetailView';

export function CardsPageDetailSection(): React.ReactElement {
  const {id} = useParams<'id'>();
  return (
    <>
      <CardDetailView id={id} />
    </>
  );
}
