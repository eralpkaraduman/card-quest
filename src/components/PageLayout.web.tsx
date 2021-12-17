import React, {ReactElement} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {Text, useWindowDimensions} from 'react-native';
import styled, {css} from 'styled-components/native';
import Icon from '@/icons.web';

const SidebarContainer = styled.View`
  display: flex;
  flex-direction: column;
  border-right-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.main};
  padding: ${({theme}) => theme.dimensions.padding.large}px;
  gap: ${({theme}) => theme.dimensions.padding.medium}px;
`;

const ContentContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.View<{windowWidth: number}>`
  display: flex;
  flex-direction: column;
  ${({windowWidth, theme}) => {
    const size = theme.getWindowSize(windowWidth);
    return css`
      ${size.xlarge && 'max-width: 1020px'};
      ${size.large && 'max-width: 820px'};
      ${size.medium && 'max-width: 620px'};
    `;
  }}
`;

const Container = styled.View<{windowHeight: number}>`
  display: flex;
  flex-direction: row;
  min-height: ${({windowHeight}) => windowHeight}px;
`;

const LinkIcon = styled(Icon.FontAwesome5Icon).attrs(({theme, $active}) => ({
  solid: true,
  size: 18,
  color: $active ? theme.colors.main : theme.colors.secondary,
}))<{$active: boolean}>`
  display: flex;
  margin-right: ${({theme}) => theme.dimensions.padding.small}px;
`;

// We don't use `styled.Text` so we can get the redeclared Text with href prop, see global.d.ts
const SidebarLink = styled(Text).attrs({accessibilityRole: 'link'})<{
  $active: boolean;
}>`
  display: flex;
  align-items: center;
  color: ${({theme, $active}) =>
    $active ? theme.colors.main : theme.colors.secondary};
  font-size: ${({theme}) => theme.fontSize.menuItem};
`;

const sideBarLinks: [string, string, string][] = [
  ['/', 'Home', 'dungeon'],
  ['/cards', 'Cards', 'scroll'],
];

export function PageLayout(): ReactElement | null {
  const {width, height} = useWindowDimensions();
  const location = useLocation();
  const renderLink = (pathName: string, title: string, iconName: string) => {
    const active = location.pathname === pathName;
    return (
      <SidebarLink href={pathName} $active={active} key={pathName}>
        <LinkIcon name={iconName} $active={active} />
        {title}
      </SidebarLink>
    );
  };

  return (
    <Container windowHeight={height}>
      <SidebarContainer>
        {sideBarLinks.map(args => renderLink(...args))}
      </SidebarContainer>
      <ContentContainer>
        <ContentWrapper windowWidth={width}>
          <Outlet />
        </ContentWrapper>
      </ContentContainer>
    </Container>
  );
}
