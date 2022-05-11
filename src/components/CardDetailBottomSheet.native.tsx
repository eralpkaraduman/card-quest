import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  PropsWithChildren,
} from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BackHandler} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SubtitleText} from '@components/SubtitleText';
import {mergeRefs} from '@/utils/mergeRefs';
import {CommonButton} from './CommonButton';
import * as Styles from './CardDetailBottomSheet.styles.native';

export type CardDetailBottomSheet_Props = PropsWithChildren<{
  onDismiss: () => void;
}>;

export const CardDetailBottomSheet = forwardRef<
  BottomSheetModal,
  CardDetailBottomSheet_Props
>(function CardDetailBottomSheet({onDismiss, children}, ref) {
  const [index, setIndex] = useState<number>(-1);
  const isOpen = index > 0;
  const localRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!isOpen) {
        return false;
      }
      localRef.current?.dismiss();
      return true;
    });
    return handler.remove;
  }, [isOpen]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.8}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <Styles.BottomSheet
      ref={mergeRefs(localRef, ref)}
      onDismiss={onDismiss}
      onChange={setIndex}
      snapPoints={['70%']}
      index={0}
      backdropComponent={renderBackdrop}
    >
      <Styles.Container>
        <ScrollView indicatorStyle="white">
          {children}
          <CommonButton onPress={() => localRef?.current?.dismiss()}>
            <SubtitleText>CLOSE</SubtitleText>
          </CommonButton>
        </ScrollView>
      </Styles.Container>
    </Styles.BottomSheet>
  );
});
