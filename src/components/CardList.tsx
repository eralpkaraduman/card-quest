import React, {ReactElement, ElementType} from 'react';
import {ListRenderItem, StyleProp, ViewStyle} from 'react-native';
import {Card, cardList} from '@controllers/Deck';
import {GameCardSize} from '@components/GameCard';
import {DonsolCard} from '@controllers/DonsolCard';
import * as Styles from './CardList.styles';

interface CardList_Props {
  cardSize: GameCardSize;
  numColumns?: number;
  style?: StyleProp<ViewStyle>;
}

const InvisibleCard: -1 = -1;

export function CardList({
  numColumns = 1,
  cardSize,
  style,
}: CardList_Props): ReactElement {
  const renderCard: ListRenderItem<Card | typeof InvisibleCard> = ({item}) => {
    if (item === InvisibleCard) {
      return <Styles.EmptyCard numColumns={numColumns} size={cardSize} />;
    }
    const donsolCard = new DonsolCard(item);
    return (
      <Styles.StyledGameCard
        donsolCard={donsolCard}
        size={cardSize}
        numColumns={numColumns}
      />
    );
  };

  const invisibleCards = Array.from(
    // Calculates how many empty cards needed to fill the grid.
    {
      length: Math.max(
        0,
        numColumns - (cardList.length % numColumns || numColumns),
      ),
    },
    () => InvisibleCard,
  );

  return (
    // <ElementType> is a hack to get FlatList working with styled-components
    <Styles.StyledFlatList<ElementType>
      style={style}
      numColumns={numColumns}
      data={[...cardList, ...invisibleCards]}
      renderItem={renderCard}
      keyExtractor={(card: Card, index: number) =>
        `${card ?? 'empty'}-${index}`
      }
    />
  );
}
