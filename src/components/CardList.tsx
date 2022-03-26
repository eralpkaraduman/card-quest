import React from 'react';
import {DonsolCard, partitionedGameCards} from '@controllers/DonsolCard';
import styled from 'styled-components/native';
import {SubtitleText} from '@components/SubtitleText';
import {BodyText} from '@components/BodyText';
import {GameCard} from '@components/GameCard';

const CardGrid = styled.View`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: ${({theme}) => theme.dimensions.padding.medium};
  margin-bottom: ${({theme}) => theme.dimensions.padding.xlarge};
`;

const StyledGameCard = styled(GameCard)`
  margin-right: ${({theme}) => theme.dimensions.padding.small};
  margin-bottom: ${({theme}) => theme.dimensions.padding.small};
  width: 86px;
`;

const CardTypeTitle = styled(SubtitleText)`
  margin-bottom: ${({theme}) => theme.dimensions.padding.small};
`;

export type CardWrapper = React.FC<React.PropsWithChildren<{cardId: string}>>;

export interface CardList_Props {
  cardWrapper?: CardWrapper;
}

export function CardList({cardWrapper}: CardList_Props): React.ReactElement {
  const {monsters, shields, potions} = partitionedGameCards;
  const renderCard = (donsolCard: DonsolCard, index: number) => {
    const Wrapper = cardWrapper ?? React.Fragment;
    return (
      <Wrapper cardId={donsolCard.id} key={index}>
        <StyledGameCard donsolCard={donsolCard} />
      </Wrapper>
    );
  };
  return (
    <>
      <CardTypeTitle>Potions</CardTypeTitle>
      <BodyText>
        A potion gives you health points equal to its value, up to a maximum of
        21 health points.
      </BodyText>
      <BodyText>
        Drinking multiple potions in a row will make you sick and result in no
        extra healing, only the first potion's value will be gained in HP.
      </BodyText>
      <BodyText>
        Potions are equal to their value and face cards (J,Q,K,A) each are equal
        to 11.
      </BodyText>
      <CardGrid>{potions.map(renderCard)}</CardGrid>

      <CardTypeTitle>Monsters</CardTypeTitle>
      <BodyText>
        Monster cards are equal to their value, and face cards are as follows J
        is 11, Q is 13, K is 15, A is 17;
      </BodyText>
      <BodyText>Jokers are both equal to 21.</BodyText>
      <CardGrid>{monsters.map(renderCard)}</CardGrid>

      <CardTypeTitle>Shields</CardTypeTitle>
      <BodyText>
        A shield absorbs the damage difference between the shield value and that
        of the attacked monster's value.
      </BodyText>
      <BodyText>
        Shields can only defend against monsters in descending value and if you
        use a shield on a monster with higher or equal value to the previous, it
        will break.
      </BodyText>
      <BodyText>
        Broken shields leave you unarmored, and taking full damage.
      </BodyText>
      <BodyText>
        Folding shield card will always replace a previously equipped shield.
        Shields are equal to their value and face cards (J,Q,K,A) each are equal
        to 11.
      </BodyText>
      <CardGrid>{shields.map(renderCard)}</CardGrid>
    </>
  );
}
