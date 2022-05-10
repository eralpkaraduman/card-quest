import React, {ReactElement, useRef, useCallback, useMemo} from 'react';
import {CardList, CardWrapper} from '@components/CardList';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BodyText} from '@components/BodyText';
import {TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

export function CardsScreen(): ReactElement {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const presentModal = () => {
    bottomSheetRef.current?.present();
  };

  const cardWrapper: CardWrapper = ({children, cardId}) => (
    <TouchableOpacity onPress={() => presentModal()}>
      {children}
    </TouchableOpacity>
  );

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} opacity={0.8} />,
    [],
  );

  const snapPoints = useMemo(() => ['25%', '50'], []);

  return (
    <>
      <ScrollingScreenContainer>
        <CardList cardWrapper={cardWrapper} />
      </ScrollingScreenContainer>
      <BottomSheetModal
        enablePanDownToClose
        index={1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <BodyText>Naber</BodyText>
      </BottomSheetModal>
    </>
  );
}
