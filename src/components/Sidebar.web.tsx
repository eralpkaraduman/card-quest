import React, {ReactElement} from 'react';
import * as Styles from './Sidebar.styles.web';

interface Sidebar_Props {
  compact: boolean;
  width: number;
}

export function Sidebar({compact, width}: Sidebar_Props): ReactElement {
  return (
    <Styles.Container width={width} compact={compact}>
      <Styles.StyledLink to="/">
        <Styles.DungeonIcon />
        {!compact && <Styles.ButtonTitle>Home</Styles.ButtonTitle>}
      </Styles.StyledLink>
      <Styles.StyledLink to="/cards">
        <Styles.CardIcon />
        {!compact && <Styles.ButtonTitle>Cards</Styles.ButtonTitle>}
      </Styles.StyledLink>
      <Styles.StyledLink to="/game">
        <Styles.SwordIcon />
        {!compact && <Styles.ButtonTitle>Game</Styles.ButtonTitle>}
      </Styles.StyledLink>
      <Styles.StyledLink to="/battle-log">
        <Styles.ScrollIcon />
        {!compact && <Styles.ButtonTitle>Log</Styles.ButtonTitle>}
      </Styles.StyledLink>
    </Styles.Container>
  );
}
