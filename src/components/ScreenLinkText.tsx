import React, {PropsWithChildren, ReactElement} from 'react';
import {AnyScreenType, TabScreenType, TabType} from '@/global';
import {ScreenHrefMap} from '@/screenHrefMap';
import {useCrossPlatformLink} from '@hooks/crossPlatformLink';

type ScreenLinkText_Props<
  T extends TabType,
  S extends TabScreenType<T>,
> = PropsWithChildren<{
  tab: T;
  screen: S;
}>;

export function ScreenLinkText<T extends TabType, S extends TabScreenType<T>>({
  children,
  tab,
  screen,
}: ScreenLinkText_Props<T, S>): ReactElement {
  const LinkComponent = useCrossPlatformLink(
    ScreenHrefMap[screen as AnyScreenType],
    tab,
    screen,
  );
  return <LinkComponent>{children}</LinkComponent>;
}
