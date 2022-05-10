import React, {
  ReactElement,
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import {CardList, CardWrapper} from '@components/CardList';
import {ScrollingScreenContainer} from '@components/ScrollingScreenContainer.native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BackHandler, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {CardDetailView} from '@components/CardDetailView';
import {ScrollView} from 'react-native-gesture-handler';
import {SubtitleText} from '@components/SubtitleText';

const StyledBottomSheetModal = styled(BottomSheetModal).attrs(({theme}) => ({
  backgroundStyle: {
    backgroundColor: theme.colors.darkGray,
  },
  handleIndicatorStyle: {
    backgroundColor: theme.colors.main,
  },
}))``;

const BottomSheetContentContainer = styled.View`
  padding: ${({theme}) => theme.dimensions.padding.medium};
`;

export function CardsScreen(): ReactElement {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | undefined>(
    undefined,
  );
  const dismissBottomSheet = () => bottomSheetRef.current?.dismiss();

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!selectedCardId) {
        return false;
      }
      dismissBottomSheet();
      return true;
    });
    return handler.remove;
  }, [selectedCardId]);

  const handleOnCardPress = (cardId: string) => {
    setSelectedCardId(cardId);
    bottomSheetRef.current?.present();
  };

  const handleOnBottomSheetDismissed = () => {
    setSelectedCardId(undefined);
  };
  const cardWrapper: CardWrapper = ({children, cardId}) => (
    <TouchableOpacity onPress={() => handleOnCardPress(cardId)}>
      {children}
    </TouchableOpacity>
  );

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} opacity={0.8} />,
    [],
  );

  const snapPoints = useMemo(() => ['25%', '70%'], []);

  return (
    <>
      <ScrollingScreenContainer>
        <CardList cardWrapper={cardWrapper} />
      </ScrollingScreenContainer>
      <StyledBottomSheetModal
        enablePanDownToClose
        index={1}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        onDismiss={handleOnBottomSheetDismissed}
      >
        <BottomSheetContentContainer>
          <ScrollView indicatorStyle="white">
            <CardDetailView id={selectedCardId} />
            <StyledButton onPress={dismissBottomSheet}>
              <SubtitleText>CLOSE</SubtitleText>
            </StyledButton>
          </ScrollView>
        </BottomSheetContentContainer>
      </StyledBottomSheetModal>
    </>
  );
}

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.main};
  border-radius: ${({theme}) => theme.dimensions.borderRadius};
  padding: ${({theme}) => theme.dimensions.padding.small};
`;
