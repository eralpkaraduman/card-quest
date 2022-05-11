import styled from 'styled-components/native';

export const CommonButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-width: 2px;
  border-color: ${({theme}) => theme.colors.main};
  border-radius: ${({theme}) => theme.dimensions.borderRadius};
  padding: ${({theme}) => theme.dimensions.padding.small};
`;
