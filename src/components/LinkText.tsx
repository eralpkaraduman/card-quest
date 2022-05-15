import React, {ReactNode} from 'react';
import {BodyText} from './BodyText';
import styled from 'styled-components/native';
import {Linking, Platform} from 'react-native';
import {Link} from 'react-router-dom';
import {isOutgoingLink} from '@/utils/isOutgoingLink';

const StyledText = styled(BodyText)`
  text-decoration: underline;
  text-decoration-color: ${({theme}) => theme.colors.white};
`;

type StyledLink_Props = React.PropsWithChildren<{
  to: string;
}>;

export function StyledLink({
  to,
  children,
}: StyledLink_Props): React.ReactElement {
  return React.createElement(Link, {to}, children);
}

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

  if (Platform.OS === 'web' && href) {
    if (isOutgoingLink(href)) {
      return (
        <a href={href}>
          <StyledText>{children}</StyledText>
        </a>
      );
    }
    return (
      <StyledLink to={href}>
        <StyledText>{children}</StyledText>
      </StyledLink>
    );
  } else {
    return <StyledText onPress={handleOnPress}>{children}</StyledText>;
  }
}
