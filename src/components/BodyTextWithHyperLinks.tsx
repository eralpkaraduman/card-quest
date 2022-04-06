import React, {ReactNode} from 'react';
import {BodyText} from './BodyText';
import HyperLink from 'react-native-hyperlink';
import {StyleProp, TextStyle} from 'react-native';

const hyperLinkStyle: StyleProp<TextStyle> = {textDecorationLine: 'underline'};

type BodyTextWithHyperLinks_Props = {children: ReactNode};

export function BodyTextWithHyperLinks({
  children,
}: BodyTextWithHyperLinks_Props): React.ReactElement {
  return (
    <HyperLink linkDefault linkStyle={hyperLinkStyle}>
      <BodyText>{children}</BodyText>
    </HyperLink>
  );
}
