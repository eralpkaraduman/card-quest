import styled, {css} from 'styled-components/native';

export const Container = styled.View<{windowHeight: number}>`
  display: flex;
  flex-direction: row;
  min-height: ${({windowHeight}) => windowHeight}px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const ContentContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.View<{windowWidth: number}>`
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
