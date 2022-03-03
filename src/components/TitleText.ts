import styled, {css} from 'styled-components/native';

export const TitleText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.fontSize.xlarge};
    font-family: ${theme.fontFamily.title};
    font-weight: ${theme.fontWeight.title};
    color: ${theme.colors.main};
  `}
`;
