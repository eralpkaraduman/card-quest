import React, {ReactElement} from 'react';
import {DonsolCard, DonsolCardKind} from '@controllers/DonsolCard';
import {CardSuit} from '@controllers/Deck';
import {StyleProp, View, ViewStyle} from 'react-native';
import * as Styles from './GameCard.styles';

const CardSuitIconMap: {[key in CardSuit]: ReactElement} = {
  [CardSuit.clubs]: <Styles.SuitIcon_MC name="cards-club" color="white" />,
  [CardSuit.spades]: <Styles.SuitIcon_MC name="cards-spade" color="white" />,
  [CardSuit.hearts]: <Styles.SuitIcon_MC name="cards-heart" color="red" />,
  [CardSuit.diamonds]: <Styles.SuitIcon_MC name="cards-diamond" color="red" />,
  [CardSuit.joker]: (
    <Styles.SuitIcon_FA5 name="kiss-wink-heart" color="yellow" />
  ),
};

const CardKindIconNameMap: {[key in DonsolCardKind]: string} = {
  [DonsolCardKind.monster]: 'sword-cross',
  [DonsolCardKind.potion]: 'flask',
  [DonsolCardKind.shield]: 'shield',
};

export interface GameCard_Props {
  donsolCard?: DonsolCard | null;
  style?: StyleProp<ViewStyle>;
}

export function GameCard({
  donsolCard: nullableDonsolCard,
  style,
}: GameCard_Props): ReactElement {
  const renderContent = (donsolCard: DonsolCard) => {
    const {suit, value} = donsolCard.card;
    return (
      <>
        <Styles.CardHeader>
          {CardSuitIconMap[suit]}
          {suit !== CardSuit.joker && (
            <Styles.ValueText>{value}</Styles.ValueText>
          )}
        </Styles.CardHeader>
        <Styles.CardContentContainer>
          <Styles.CardKindIcon
            kind={donsolCard.kind}
            name={CardKindIconNameMap[donsolCard.kind]}
          />
          <Styles.CardEffectValueText kind={donsolCard.kind}>
            {donsolCard.effect}
          </Styles.CardEffectValueText>
        </Styles.CardContentContainer>
      </>
    );
  };

  return (
    <Styles.Container style={style} empty={!nullableDonsolCard}>
      {nullableDonsolCard ? renderContent(nullableDonsolCard) : <View />}
    </Styles.Container>
  );
}
