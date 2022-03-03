import styled, {css} from 'styled-components/native';

export const SubtitleText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.fontSize.large};
    font-family: ${theme.fontFamily.subtitle};
    font-weight: ${theme.fontWeight.subtitle};
    color: ${theme.colors.main};
  `}
`;
