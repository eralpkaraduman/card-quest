import React, {ReactElement} from 'react';
import {GameCardSize} from './GameCard.styles';
import {DonsolCard} from '@controllers/DonsolCard';
import {GameCard} from './GameCard';
import * as Styles from './CardSlot.styles';
import {StyleProp, ViewStyle} from 'react-native';

interface CardSlot_Props {
  size: GameCardSize;
  card?: DonsolCard | null;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title: string | number;
}

export function CardSlot({
  title,
  size,
  card,
  style,
  onPress,
}: CardSlot_Props): ReactElement {
  return (
    <Styles.Container size={size} style={style}>
      <Styles.Title>{title}</Styles.Title>
      {card ? (
        <GameCard onPress={onPress} donsolCard={card} size={size} />
      ) : (
        <Styles.PlaceHolder size={size} />
      )}
    </Styles.Container>
  );
}
