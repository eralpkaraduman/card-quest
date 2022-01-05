import React, {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';
import {useWindowDimensions} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Sidebar} from './Sidebar.web';
import * as Styles from './PageLayout.styles.web';

export function PageLayout(): ReactElement | null {
  const {width, height} = useWindowDimensions();
  const {getWindowSize} = useTheme();
  const size = getWindowSize(width);

  return (
    <Styles.Container windowHeight={height}>
      <Sidebar hideTitles={(size.xsmall || size.small) ?? false} />
      <Styles.ContentContainer>
        <Styles.ContentWrapper windowWidth={width}>
          <Outlet />
        </Styles.ContentWrapper>
      </Styles.ContentContainer>
    </Styles.Container>
  );
}
