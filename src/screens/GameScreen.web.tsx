import React, {ReactElement} from 'react';
import {GameView} from '@components/GameView';
import {HeadTitle} from '@hooks/useHead.web';
import {useNavigate} from 'react-router-dom';

export function GameScreen(): ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <HeadTitle>Card Quest: Game</HeadTitle>
      <GameView onNavigateToBattleLog={() => navigate('/battle-log')} />
    </>
  );
}
