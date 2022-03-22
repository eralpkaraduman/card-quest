import {useWindowSizeAttributes} from '@hooks/dimensions';
import React from 'react';
import styled, {css} from 'styled-components/native';

export type Button_Props = React.PropsWithChildren<{
  disabled?: boolean;
  onPress?: () => void;
}>;

const Container = styled.TouchableHighlight<{fullWidth?: boolean}>`
  ${({theme, fullWidth}) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.background};
    padding: ${theme.dimensions.padding.small};
    border-radius: ${theme.dimensions.borderRadius};
    border-color: ${theme.colors.main};
    border-width: 1px;
    align-items: center;
    justify-content: center;
    margin-bottom: ${theme.dimensions.padding.small};
    ${!fullWidth &&
    css`
      margin-left: auto;
      margin-right: auto;
    `};
  `}
`;

export function CQButton({
  children,
  onPress,
  disabled,
}: Button_Props): React.ReactElement {
  const {narrow} = useWindowSizeAttributes();
  return (
    <Container onPress={onPress} disabled={disabled} fullWidth={narrow}>
      {children}
    </Container>
  );
}
