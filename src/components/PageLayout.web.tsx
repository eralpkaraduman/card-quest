import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import {Sidebar} from './Sidebar.web';
import * as Styles from './PageLayout.styles.web';
import {
  useWindowHeight,
  useWindowSizeAttributes,
  useWindowWidth,
} from '@/hooks/dimensions';

export function PageLayout(): ReactElement | null {
  const height = useWindowHeight();
  const width = useWindowWidth();
  const size = useWindowSizeAttributes();
  const compactSidebar = (size.xsmall || size.small) ?? false;
  const sidebarWidth = compactSidebar ? 56 : 180;

  return (
    <Styles.Container windowHeight={height}>
      <Sidebar width={sidebarWidth} compact={compactSidebar} />
      <Styles.ContentContainer windowWidth={width} sidebarWidth={sidebarWidth}>
        <Styles.ContentWrapper windowSizeClass={size}>
          <Outlet />
        </Styles.ContentWrapper>
      </Styles.ContentContainer>
    </Styles.Container>
  );
}
