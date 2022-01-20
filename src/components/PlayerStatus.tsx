import React, {ReactElement} from 'react';
import styled from 'styled-components/native';
import {HealthBar} from './HealthBar';
import {ShieldStatus} from './ShieldStatus';

const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export function PlayerStatus(): ReactElement {
  return (
    <Container>
      <HealthBar />
      <ShieldStatus />
    </Container>
  );
}
