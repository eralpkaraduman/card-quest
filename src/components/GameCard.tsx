import React, {ReactElement} from 'react';
import {DonsolCard, DonsolCardKind} from '@controllers/DonsolCard';
import {CardSuit} from '@controllers/Deck';
import {StyleProp, ViewStyle} from 'react-native';
import * as Styles from './GameCard.styles';

export {GameCardSize} from './GameCard.styles';

export interface GameCard_Props {
  donsolCard: DonsolCard;
  size: Styles.GameCardSize;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

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

export function GameCard({
  donsolCard,
  size,
  style,
  onPress,
}: GameCard_Props): ReactElement {
  const {suit, value} = donsolCard.card;
  return (
    <Styles.Container size={size} style={style} onPress={onPress}>
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
    </Styles.Container>
  );
}
