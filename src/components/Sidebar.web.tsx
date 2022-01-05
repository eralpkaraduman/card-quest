import React, {ReactElement} from 'react';
import {useLocation} from 'react-router-dom';
import * as Styles from './Sidebar.styles.web';

const Buttons: [path: string, title: string, Icon: Styles.IconType][] = [
  ['/', 'Home', Styles.DungeonIcon],
  ['/cards', 'Cards', Styles.ScrollIcon],
  ['/game', 'Game', Styles.SwordIcon],
];

export function Sidebar(): ReactElement {
  const location = useLocation();
  const renderLink = (
    pathName: string,
    title: string,
    Icon: Styles.IconType,
  ) => {
    const active = location.pathname === pathName;
    return (
      <Styles.Button href={pathName} $active={active} key={pathName}>
        {title}
        <Icon $active={active} />
      </Styles.Button>
    );
  };
  return (
    <Styles.Container>
      {Buttons.map(args => renderLink(...args))}
    </Styles.Container>
  );
}
