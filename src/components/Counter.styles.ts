import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.background};
`;

export const SectionDescription = styled.View`
  margin-top: 8;
  font-size: 18;
  font-weight: 400;
`;

export const Highlight = styled.View`
  font-weight: '700';
`;

export const ButtonText = styled.Text`
  background-color: ${({theme}) => theme.colors.main};
  color: ${({theme}) => theme.colors.background};
  padding: 8px;
  text-align: center;
`;

export const NumberText = styled.Text`
  color: ${({theme}) => theme.colors.main};
  font-size: 34px;
  font-weight: 600;
  text-align: center;
  padding: 8px;
`;
