import React from 'react';
import {DialogContent, DialogOverlay} from '@reach/dialog';
import {useNavigate, useParams} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import {defaultTheme} from '../../src/theme';

import {CardDetailView} from './CardDetailView';

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
  border-color: ${({theme}) => theme.colors.gray};
  border-width: 2px;
  border-style: solid;
  padding: ${({theme}) => theme.dimensions.padding.large};
`;

const CloseButton = styled.button`
  font-family: ${({theme}) => theme.fontFamily.title};
  font-size: ${({theme}) => theme.fontSize.medium};
  font-weight: ${({theme}) => theme.fontWeight.title};
  background-color: ${({theme}) => theme.colors.background};
  border-color: ${({theme}) => theme.colors.gray};
  border-width: 2px;
  padding: ${({theme}) => theme.dimensions.padding.medium};
  border-style: solid;
  border-radius: ${({theme}) => theme.dimensions.borderRadius};
  color: ${({theme}) => theme.colors.main};
  cursor: pointer;
`;

export function CardDetailModal(): React.ReactElement {
  const navigate = useNavigate();
  const {id} = useParams<'id'>();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const onDismiss = () => navigate(-1);

  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Need to provide the theme because we don't use styled-components/native here*/}
      <DialogOverlay
        aria-labelledby="label"
        onDismiss={onDismiss}
        initialFocusRef={closeButtonRef}
      >
        <StyledDialogContent aria-labelledby="label">
          <CardDetailView id={id} />
          <CloseButton onClick={onDismiss}>Close</CloseButton>
        </StyledDialogContent>
      </DialogOverlay>
    </ThemeProvider>
  );
}
