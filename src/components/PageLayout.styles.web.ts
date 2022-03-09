import {WindowSizeClass} from '@/global';
import styled, {css} from 'styled-components/native';

export const Container = styled.View<{windowHeight: number}>`
  display: flex;
  flex-direction: row;
  max-height: ${({windowHeight}) => windowHeight}px;
`;

export const ContentContainer = styled.View<{
  sidebarWidth: number;
  windowWidth: number;
}>`
  display: flex;
  flex-direction: row;
  padding-left: ${({sidebarWidth}) => sidebarWidth}px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

export const ContentWrapper = styled.View<{windowSizeClass: WindowSizeClass}>`
  display: flex;
  flex-direction: column;
  padding: ${({theme}) => theme.dimensions.padding.medium};
  padding-bottom: ${({theme}) => theme.dimensions.padding.xlarge};
  max-width: 100%;
  ${({windowSizeClass: {xlarge, large, medium}}) => {
    return css`
      ${xlarge && 'max-width: 1020px'};
      ${large && 'max-width: 820px'};
      ${medium && 'max-width: 620px'};
    `;
  }};
`;
