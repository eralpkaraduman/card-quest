import React, {ReactElement} from 'react';
import styled from 'styled-components/native';
import {HealthBar} from './HealthBar';
import {ShieldStatus} from './ShieldStatus';
import {UserAvatar} from './UserAvatar';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StatusBarsContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export function PlayerStatus(): ReactElement {
  return (
    <Container>
      <UserAvatar />
      <StatusBarsContainer>
        <HealthBar />
        <ShieldStatus />
      </StatusBarsContainer>
    </Container>
  );
}
