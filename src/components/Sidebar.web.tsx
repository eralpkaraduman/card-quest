import React, {ReactElement} from 'react';
import * as Styles from './Sidebar.styles.web';

const Buttons: [path: string, title: string, Icon: Styles.IconType][] = [
  ['/', 'Home', Styles.DungeonIcon],
  ['/cards', 'Cards', Styles.CardIcon],
  ['/game', 'Game', Styles.SwordIcon],
  ['/battle-log', 'Log', Styles.ScrollIcon],
];

interface Sidebar_Props {
  compact: boolean;
  width: number;
}

export function Sidebar({compact, width}: Sidebar_Props): ReactElement {
  const renderLink = (
    pathName: string,
    title: string,
    Icon: Styles.IconType,
  ) => {
    return (
      <Styles.Button to={pathName} key={pathName}>
        <Icon />
        {!compact && <Styles.ButtonTitle>{title}</Styles.ButtonTitle>}
      </Styles.Button>
    );
  };
  return (
    <Styles.Container width={width} compact={compact}>
      {Buttons.map(args => renderLink(...args))}
    </Styles.Container>
  );
}
