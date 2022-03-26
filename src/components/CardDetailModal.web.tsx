import {DialogContent, DialogOverlay} from '@reach/dialog';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {CardDetailView} from './CardDetailView';

const StyledDialogContent = styled(DialogContent)`
  background-color: red;
`;

export function CardDetailModal(): React.ReactElement {
  const navigate = useNavigate();
  const {id} = useParams<'id'>();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const onDismiss = () => navigate(-1);

  return (
    <DialogOverlay
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={closeButtonRef}>
      <StyledDialogContent aria-labelledby="label">
        <CardDetailView id={id} />
      </StyledDialogContent>
    </DialogOverlay>
  );
}
