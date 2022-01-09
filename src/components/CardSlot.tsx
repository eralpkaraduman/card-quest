import React, {ReactElement} from 'react';
import {GameCardSize} from './GameCard.styles';
import {DonsolCard} from '@controllers/DonsolCard';
import {GameCard} from './GameCard';
import * as Styles from './CardSlot.styles';

interface CardSlot_Props {
  size: GameCardSize;
  card?: DonsolCard | null;
  onPress?: () => void;
  title: string | number;
}

export function CardSlot({
  title,
  size,
  card,
  onPress,
}: CardSlot_Props): ReactElement {
  return (
    <Styles.Container size={size}>
      <Styles.Title>{title}</Styles.Title>
      {card ? (
        <GameCard
          onPress={onPress}
          donsolCard={card}
          size={GameCardSize.large}
        />
      ) : (
        <Styles.PlaceHolder size={size} />
      )}
    </Styles.Container>
  );
}
