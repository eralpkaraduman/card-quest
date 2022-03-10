import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import {Sidebar} from './Sidebar.web';
import * as Styles from './PageLayout.styles.web';
import {
  useWindowHeight,
  useWindowSizeAttributes,
  useWindowWidth,
} from '@/hooks/dimensions';
import {ScrollToTop} from './ScrollToTop.web';

export function PageLayout(): ReactElement | null {
  const height = useWindowHeight();
  const width = useWindowWidth();
  const size = useWindowSizeAttributes();
  const compactSidebar = (size.xsmall || size.small) ?? false;
  const sidebarWidth = compactSidebar ? 56 : 170;
  const contentWidth = width - sidebarWidth;

  return (
    <Styles.Container windowHeight={height}>
      <Sidebar width={sidebarWidth} compact={compactSidebar} />
      <Styles.ContentContainer sidebarWidth={sidebarWidth} width={contentWidth}>
        <Styles.ContentWrapper windowSizeClass={size} maxWidth={contentWidth}>
          <ScrollToTop>
            <Outlet />
          </ScrollToTop>
        </Styles.ContentWrapper>
      </Styles.ContentContainer>
    </Styles.Container>
  );
}
