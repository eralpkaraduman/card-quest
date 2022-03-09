import {WindowSizeClass} from '@/global';
import styled, {css} from 'styled-components/native';

export const Container = styled.View<{windowHeight: number}>`
  display: flex;
  flex: 1;
  flex-direction: row;
  min-height: 100%;
  width: 100%;
`;

export const ContentContainer = styled.View<{
  sidebarWidth: number;
  width: number;
}>`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding-left: ${({sidebarWidth}) => sidebarWidth}px;
  background-color: ${({theme}) => theme.colors.background};
  justify-content: center;
`;

export const ContentWrapper = styled.View<{
  windowSizeClass: WindowSizeClass;
  maxWidth: number;
}>`
  display: flex;
  flex-direction: column;
  padding: ${({theme}) => theme.dimensions.padding.medium};
  padding-bottom: ${({theme}) => theme.dimensions.padding.xlarge};
  flex-wrap: wrap;
  max-width: 100%;
  ${({windowSizeClass: {xlarge, large, medium}}) => {
    return css`
      ${xlarge && 'max-width: 1020px'};
      ${large && 'max-width: 820px'};
      ${medium && 'max-width: 620px'};
    `;
  }};
`;
