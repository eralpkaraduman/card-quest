import {MAX_HEALTH} from '@controllers/GameController';
import {useGameController} from '@controllers/GameControllerProvider';
import React, {ReactElement, useState} from 'react';
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
  background-color: ${({theme}) => theme.alphaColor(theme.colors.red, 0.25)};
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
  min-width: 50px;
  color: ${({theme}) => theme.colors.main};
  margin-left: ${({theme}) => theme.dimensions.padding.small}px;
  margin-right: ${({theme}) => theme.dimensions.padding.small}px;
  font-size: 11px;
`;

export function HealthBar(): ReactElement {
  const game = useGameController();
  const [health, setHealth] = useState<number>(game.health);

  React.useEffect(() => {
    const removeEventListener = game.addEventListener({
      onHealthChange() {
        setHealth(game.health);
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  return (
    <Container>
      <Title>{`🩸${health} / ${MAX_HEALTH}`}</Title>
      <Bar>
        <BarFill amount={health / MAX_HEALTH} />
      </Bar>
    </Container>
  );
}
