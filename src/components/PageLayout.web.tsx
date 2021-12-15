import React, {ReactElement, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import Icons from '@/icons.web';

const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.View`
  display: flex;
  flex-direction: column;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: ${({theme}) => theme.colors.main};
  padding: 10px;
  gap: 5px;
`;

const ContentContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// We don't use styled.Text so we can get the redeclared Text with href prop, see global.d.ts
const SidebarLink = styled(Text).attrs({accessibilityRole: 'link'})`
  color: ${({theme}) => theme.colors.main};
  font-size: ${({theme}) => theme.fontSize.menuItem};
`;

export function PageLayout({
  children,
}: PropsWithChildren<{}>): ReactElement | null {
  return (
    <Container>
      <SidebarContainer>
        <SidebarLink href="/">Home</SidebarLink>
        <SidebarLink href="/game">Game</SidebarLink>
        <SidebarLink href="/cards">Cards</SidebarLink>
        <SidebarLink href="/cards">
          <Icons.FontAwesomeIcon name="rocket" size={30} color="#900" />
        </SidebarLink>
      </SidebarContainer>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
}
