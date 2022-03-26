import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.main};
  margin-bottom: ${({theme}) => theme.dimensions.padding.small};
  font-size: 10px;
`;
