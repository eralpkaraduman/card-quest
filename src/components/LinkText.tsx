import React, {ReactNode} from 'react';
import {BodyText} from './BodyText';
import styled from 'styled-components/native';
import {Linking, Platform} from 'react-native';

const StyledText = styled(BodyText)`
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.white};
`;

type LinkText_Props = {
  children: ReactNode;
  href?: string;
  onPress?: () => void;
};

export function LinkText({
  children,
  href,
  onPress,
}: LinkText_Props): React.ReactElement {
  async function handleOnPress(): Promise<void> {
    if (href && (await Linking.canOpenURL(href))) {
      Linking.openURL(href);
    } else {
      onPress?.();
    }
  }

  if (Platform.OS === 'web') {
    return <a href={href}>{<StyledText>{children}</StyledText>}</a>;
  }

  return <StyledText onPress={handleOnPress}>{children}</StyledText>;
}
