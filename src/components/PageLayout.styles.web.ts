import styled, {css} from 'styled-components/native';

export const Container = styled.View<{windowHeight: number}>`
  display: flex;
  flex-direction: row;
  height: ${({windowHeight}) => windowHeight}px;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
`;

export const ContentWrapper = styled.View<{windowWidth: number}>`
  display: flex;
  max-width: 100%;

  ${({windowWidth, theme}) => {
    const size = theme.getWindowSize(windowWidth);
    return css`
      ${size.xlarge && 'max-width: 1020px'};
      ${size.large && 'max-width: 820px'};
      ${size.medium && 'max-width: 620px'};
    `;
  }};
`;
