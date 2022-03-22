import React, {ReactElement} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

const Container = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.background};
  flex: 1;
`;

export function ScrollingScreenContainer({
  children,
}: React.PropsWithChildren<{}>): ReactElement {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          padding: parseInt(theme.dimensions.padding.medium, 10),
          paddingBottom: parseInt(theme.dimensions.padding.xlarge, 10),
        }}>
        {children}
      </ScrollView>
    </Container>
  );
}
