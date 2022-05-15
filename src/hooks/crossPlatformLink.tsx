import React, {PropsWithChildren, ReactElement} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {RootNavigatorProps, TabPropsType} from '@/App.native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Platform} from 'react-native';
import {TabScreenType, TabType} from '@/global';
import {LinkText} from '@components/LinkText';

export function useCrossPlatformLink<
  T extends TabType,
  S extends TabScreenType<T>,
>(href: string, tab: T, screen: S) {
  if (Platform.OS === 'web') {
    return function WebScreenLinkText({
      children,
    }: PropsWithChildren<unknown>): ReactElement {
      return <LinkText href={href}>{children}</LinkText>;
    };
  }
  return function NativeScreenLinkText({
    children,
  }: PropsWithChildren<unknown>): ReactElement {
    const navigate = useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<TabPropsType<T>, S>,
        NativeStackNavigationProp<RootNavigatorProps>
      >
    >().navigate as (arg0: T, params: {screen: S}) => void;
    return (
      <LinkText onPress={() => navigate(tab, {screen})}>{children}</LinkText>
    );
  };
}
