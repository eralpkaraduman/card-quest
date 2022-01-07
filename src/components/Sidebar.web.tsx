import React, {ReactElement} from 'react';
import * as Styles from './Sidebar.styles.web';

const Buttons: [path: string, title: string, Icon: Styles.IconType][] = [
  ['/', 'Home', Styles.DungeonIcon],
  ['/cards', 'Cards', Styles.ScrollIcon],
  ['/game', 'Game', Styles.SwordIcon],
];

interface Sidebar_Props {
  hideTitles: boolean;
}

export function Sidebar({hideTitles}: Sidebar_Props): ReactElement {
  const renderLink = (
    pathName: string,
    title: string,
    Icon: Styles.IconType,
  ) => {
    return (
      <Styles.Button to={pathName} key={pathName}>
        <Icon />
        {!hideTitles && title}
      </Styles.Button>
    );
  };
  return (
    <Styles.Container>
      {Buttons.map(args => renderLink(...args))}
    </Styles.Container>
  );
}
