import {useGameController} from '@controllers/GameControllerProvider';
import React, {ReactElement, useState} from 'react';
import styled from 'styled-components/native';
import {HealthBar} from './HealthBar';

const Container = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export function PlayerStatus(): ReactElement {
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
      <HealthBar amount={health} />
    </Container>
  );
}
