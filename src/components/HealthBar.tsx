import {MAX_HEALTH} from '@controllers/GameController';
import {useGameController} from '@controllers/GameControllerProvider';
import React, {ReactElement, useState} from 'react';
import styled from 'styled-components/native';
import {animated, to, useSpring} from '@react-spring/native';

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

const BarFill = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.red};
  width: 100%;
  height: 100%;
`;

function AnimatedBarFill({amount}: {amount: number}): ReactElement {
  const {scaleX} = useSpring({
    scaleX: amount,
  });
  return (
    <animated.View style={{transform: [{scaleX}], flex: 1}}>
      <BarFill />
    </animated.View>
  );
}

const Title = styled.Text`
  min-width: 50px;
  color: ${({theme}) => theme.colors.main};
  margin-left: ${({theme}) => theme.dimensions.padding.small};
  margin-right: ${({theme}) => theme.dimensions.padding.small};
  font-size: ${({theme}) => theme.fontSize.small};
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
      <Title>{`🩸${Math.max(0, health)} / ${MAX_HEALTH}`}</Title>
      <Bar>
        <AnimatedBarFill amount={health / MAX_HEALTH} />
      </Bar>
    </Container>
  );
}
