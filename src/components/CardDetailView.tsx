import {DonsolCard} from '@controllers/DonsolCard';
import {DonsolCardDescriptor} from '@controllers/DonsolCardDescriptor';
import React from 'react';
import styled from 'styled-components/native';
import {BodyText} from './BodyText';
import {GameCard} from './GameCard';
import {SubtitleText} from './SubtitleText';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export interface CardDetailView_Props {
  id?: string;
}

const StyledGameCard = styled(GameCard)`
  margin-top: ${({theme}) => theme.dimensions.padding.large};
  margin-bottom: ${({theme}) => theme.dimensions.padding.medium};
  width: 86px;
`;

export function CardDetailView({id}: CardDetailView_Props) {
  const donsolCard = DonsolCard.fromString(id);
  const descriptor = donsolCard && new DonsolCardDescriptor(donsolCard);
  return (
    <Container>
      <SubtitleText>{descriptor?.title}</SubtitleText>
      <StyledGameCard donsolCard={donsolCard} />
      <BodyText>{descriptor?.description}</BodyText>
    </Container>
  );
}
