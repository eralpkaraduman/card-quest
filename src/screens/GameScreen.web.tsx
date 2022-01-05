import React, {ReactElement} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

export function GameScreen(): ReactElement {
  return <Container />;
}

