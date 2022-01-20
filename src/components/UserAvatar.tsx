import React, {useState, useEffect} from 'react';
import {useGameController} from '@controllers/GameControllerProvider';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

const AvatarIcon = styled(FontAwesome5Icon).attrs(({theme}) => ({
  size: 20,
  color: theme.colors.main,
  solid: true,
}))`
  min-width: 20px;
`;

interface AvatarState {
  injured?: boolean;
  dead?: boolean;
  hasShield?: boolean;
}

type IconName = 'user' | 'user-shield' | 'user-injured' | 'user-slash';

export function UserAvatar(): React.ReactElement {
  const game = useGameController();
  const [avatarState, setAvatarState] = useState<AvatarState>({});
  const [iconName, setIconName] = useState<IconName>('user');

  useEffect(() => {
    const removeEventListener = game.addEventListener({
      onHealthChange() {
        setAvatarState(prev => ({
          ...prev,
          injured: game.health <= 7,
          dead: game.health <= 0,
        }));
      },
      onShieldChange() {
        setAvatarState(prev => ({
          ...prev,
          hasShield: Boolean(game.shield?.effect),
        }));
      },
    });

    return () => {
      removeEventListener();
    };
  }, [game]);

  useEffect(() => {
    const {hasShield, injured, dead} = avatarState;
    let newIconName: IconName = 'user';
    if (hasShield) {
      newIconName = 'user-shield';
    }
    if (injured) {
      newIconName = 'user-injured';
    }
    if (dead) {
      newIconName = 'user-slash';
    }
    setIconName(newIconName);
  }, [avatarState]);

  return <AvatarIcon name={iconName} />;
}
