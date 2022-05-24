import {MAX_HEALTH} from '@controllers/GameController';
import {useGameController} from '@controllers/GameControllerProvider';
import React, {ReactElement, useState} from 'react';
import styled from 'styled-components/native';
import {animated, useSpring} from '@react-spring/native';

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
  height: 100%;
`;

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
  const {width} = useSpring({
    width: `${(100 / MAX_HEALTH) * health}%`,
  });

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
        <animated.View style={{width}}>
          <BarFill />
        </animated.View>
      </Bar>
    </Container>
  );
}
