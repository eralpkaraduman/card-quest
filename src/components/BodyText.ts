import styled, {css} from 'styled-components/native';

export const BodyText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.fontSize.medium};
    font-family: ${theme.fontFamily.body};
    font-weight: ${theme.fontWeight.body};
    color: ${theme.colors.main};
    margin-bottom: ${theme.dimensions.padding.medium};
    line-height: 20px;
  `}
`;
