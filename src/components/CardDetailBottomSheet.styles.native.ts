import {BottomSheetModal} from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: ${({theme}) => theme.dimensions.padding.large};
`;

export const BottomSheet = styled(BottomSheetModal).attrs(({theme}) => ({
  enablePanDownToClose: true,
  backgroundStyle: {
    backgroundColor: theme.colors.darkGray,
  },
  handleIndicatorStyle: {
    backgroundColor: theme.colors.main,
  },
}))``;
