import {useGameController} from '@controllers/GameControllerProvider';
import React, {ReactElement, useState} from 'react';
import styled, {css} from 'styled-components/native';

enum ShieldBlock {
  UNPROTECTED,
  PARTIAL,
  FULL,
}

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
  height: 100%;
  width: 100%;
`;

const Title = styled.Text`
  min-width: 50px;
  color: ${({theme}) => theme.colors.main};
  margin-left: ${({theme}) => theme.dimensions.padding.small};
  margin-right: ${({theme}) => theme.dimensions.padding.small};
  font-size: 11px;
`;

const NumbersContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const NumberText = styled.Text<{mode: ShieldBlock}>`
  ${({theme, mode}) => css`
    color: ${theme.colors.white};
    ${mode === ShieldBlock.PARTIAL &&
    css`
      background-color: ${theme.alphaColor(theme.colors.blue, 0.35)};
    `}
    ${mode === ShieldBlock.FULL &&
    css`
      background-color: ${theme.colors.blue};
    `}
    ${mode === ShieldBlock.UNPROTECTED &&
    css`
      background-color: ${theme.alphaColor(theme.colors.blue, 0.1)};
    `}
  `}
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
`;

const segments = Array.from(Array(20).keys()).map(i => i + 2);

export function ShieldStatus(): ReactElement {
  const shieldEmoji = '🛡';
  const game = useGameController();
  const [shield, setShield] = useState<number | undefined>(game.shield?.effect);
  const [lastBlocked, setLastBlocked] = React.useState<number | undefined>(
    game.lastBlockedMonster?.effect,
  );

  React.useEffect(() => {
    const removeEventListener = game.addEventListener({
      onShieldChange() {
        setShield(game.shield?.effect);
      },
      onHistoryUpdated() {
        setLastBlocked(game.lastBlockedMonster?.effect);
      },
    });
    return () => {
      removeEventListener();
    };
  }, [game]);

  const segmentModes: ShieldBlock[] = segments.map(segment => {
    let mode = ShieldBlock.UNPROTECTED;

    if (shield) {
      mode = ShieldBlock.PARTIAL;
      if (segment <= shield) {
        mode = ShieldBlock.FULL;
      }
    }

    if (lastBlocked && segment >= lastBlocked) {
      mode = ShieldBlock.UNPROTECTED;
    }

    return mode;
  });

  const lastFullIndex = segmentModes.lastIndexOf(ShieldBlock.FULL);
  const lastPartialIndex = segmentModes.lastIndexOf(ShieldBlock.PARTIAL);

  return (
    <Container>
      <Title>{`${shieldEmoji} ${shield ?? 0}`}</Title>
      <Bar>
        <NumbersContainer>
          {segments.map((segment, i) => (
            <NumberText mode={segmentModes[i]} key={segment}>
              {i === lastFullIndex || i === lastPartialIndex ? segment : ''}
            </NumberText>
          ))}
        </NumbersContainer>
      </Bar>
    </Container>
  );
}
