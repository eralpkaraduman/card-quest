import React from 'react';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

export const Container = styled.View`
  padding: ${({theme}) => theme.dimensions.padding.medium};
`;

export const BottomSheet = styled(BottomSheetModal).attrs(({theme}) => ({
  enablePanDownToClose: true,
  backgroundStyle: {
    backgroundColor: theme.colors.darkGray,
  },
  handleIndicatorStyle: {
    backgroundColor: theme.colors.main,
  },
  renderBackdrop: (
    props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
  ) => React.createElement(BottomSheetBackdrop, {...props, opacity: 0.8}),
  snapPoints: ['25%', '70%'],
  index: 1,
}))``;
