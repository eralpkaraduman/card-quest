import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import {useWindowDimensions} from 'react-native';
import {Sidebar} from './Sidebar.web';
import * as Styles from './PageLayout.styles.web';

export function PageLayout(): ReactElement | null {
  const {width, height} = useWindowDimensions();
  return (
    <Styles.Container windowHeight={height}>
      <Sidebar />
      <Styles.ContentContainer>
        <Styles.ContentWrapper windowWidth={width}>
          <Outlet />
        </Styles.ContentWrapper>
      </Styles.ContentContainer>
    </Styles.Container>
  );
}
