import React, {ReactElement} from 'react';
import {DonsolCard} from '@controllers/DonsolCard';
import {GameCard} from './GameCard';
import * as Styles from './CardSlot.styles';
import {StyleProp, ViewStyle} from 'react-native';

interface CardSlot_Props {
  card?: DonsolCard | null;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title: string | number;
}

export function CardSlot({
  title,
  card,
  style,
  onPress,
}: CardSlot_Props): ReactElement {
  return (
    <Styles.Container style={style} onPress={onPress}>
      <Styles.Title>{title}</Styles.Title>
      <GameCard donsolCard={card} />
    </Styles.Container>
  );
}
