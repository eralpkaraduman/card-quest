import React, {ReactElement, useRef, useState, useCallback} from 'react';
import {CardList, CardWrapper} from '@components/CardList';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native';
import {CardDetailView} from '@components/CardDetailView';
import {CardDetailBottomSheet} from '@components/CardDetailBottomSheet.native';

export function CardsScreen(): ReactElement {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );

  const handleOnCardPress = (cardId: string) => {
    setSelectedCardId(cardId);
    bottomSheetRef.current?.present();
  };

  const handleOnBottomSheetDismissed = () => {
    setSelectedCardId(undefined);
  };

  const renderCardWrapper = useCallback<CardWrapper>(
    ({children, cardId}) => (
      <TouchableOpacity onPress={() => handleOnCardPress(cardId)}>
        {children}
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <>
      <ScrollingScreenContainer>
        <CardList cardWrapper={renderCardWrapper} />
      </ScrollingScreenContainer>
      <CardDetailBottomSheet
        onDismiss={handleOnBottomSheetDismissed}
        ref={bottomSheetRef}
      >
        <CardDetailView id={selectedCardId} />
      </CardDetailBottomSheet>
    </>
  );
}
