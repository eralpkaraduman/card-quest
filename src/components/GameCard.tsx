import React, {ReactElement} from 'react';
import {DonsolCard, DonsolCardKind} from '@controllers/DonsolCard';
import {CardSuit} from '@controllers/Deck';
import * as Styles from './GameCard.styles';
import {StyleProp, ViewStyle} from 'react-native';

export {GameCardSize} from './GameCard.styles';

export interface GameCard_Props {
  donsolCard: DonsolCard;
  size: Styles.GameCardSize;
  style?: StyleProp<ViewStyle>;
}

const CardSuitIconMap: {[key in CardSuit]: ReactElement} = {
  [CardSuit.clubs]: <Styles.MaterialSuitIcon name="cards-club" color="white" />,
  [CardSuit.spades]: (
    <Styles.MaterialSuitIcon name="cards-spade" color="white" />
  ),
  [CardSuit.hearts]: <Styles.MaterialSuitIcon name="cards-heart" color="red" />,
  [CardSuit.diamonds]: (
    <Styles.MaterialSuitIcon name="cards-diamond" color="red" />
  ),
  [CardSuit.joker]: (
    <Styles.FontAwesomeSuitIcon name="kiss-wink-heart" color="yellow" />
  ),
};

const CardKindIconNameMap: {[key in DonsolCardKind]: string} = {
  [DonsolCardKind.monster]: 'sword-cross',
  [DonsolCardKind.potion]: 'flask',
  [DonsolCardKind.shield]: 'shield',
};

export function GameCard({
  donsolCard,
  size,
  style,
}: GameCard_Props): ReactElement {
  const {suit, value} = donsolCard.card;
  return (
    <Styles.Container size={size} style={style}>
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
    </Styles.Container>
  );
}
