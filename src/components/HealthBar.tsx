import {MAX_HEALTH} from '@controllers/GameController';
import React, {ReactElement} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  height: 14px;
  align-items: center;
`;

const Bar = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.transparentRed25};
  height: 100%;
  width: 100%;
`;

const BarFill = styled.View<{amount: number}>`
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.red};
  width: ${({amount}) => amount * 100}%;
  height: 100%;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.main};
  margin-left: ${({theme}) => theme.dimensions.padding.small}px;
  margin-right: ${({theme}) => theme.dimensions.padding.small}px;
  font-size: 11px;
`;

export function HealthBar({amount}: {amount: number}): ReactElement {
  return (
    <Container>
      <Title>{`🩸${amount} / ${MAX_HEALTH}`}</Title>
      <Bar>
        <BarFill amount={amount / MAX_HEALTH} />
      </Bar>
    </Container>
  );
}
