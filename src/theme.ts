import {DefaultTheme} from 'styled-components/native';

const colors = {
  black: '#212121',
  white: '#ffffff',
  gray: '#757575',
  darkGray: '#1a1a1a',
  red: '#FF5252',
  yellow: '#FFC107',
  blue: '#448AFF',
  green: '#388E3C',
};

const defaultTheme: DefaultTheme = {
  getWindowSizeClass: (width: number) => {
    if (width > 1200) {
      return {xlarge: true};
    }
    if (width > 1024) {
      return {large: true};
    }
    if (width > 768) {
      return {medium: true};
    }
    if (width > 480) {
      return {small: true};
    }
    return {xsmall: true};
  },
  alphaColor: (color: string, opacity: number) => {
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  },
  fontSize: {
    xsmall: '8px',
    small: '12px',
    medium: '15px',
    large: '24px',
    xlarge: '36px',
  },
  fontFamily: {
    title: 'Cinzel-Bold',
    subtitle: 'Cinzel-Medium',
    body: 'Quicksand-Regular',
  },
  fontWeight: {
    title: '700',
    subtitle: '500',
    body: '400',
  },
  colors: {
    background: colors.black,
    main: colors.white,
    secondary: colors.gray,
    potion: colors.red,
    shield: colors.blue,
    monster: colors.green,
    ...colors,
  },
  dimensions: {
    padding: {
      xlarge: '36px',
      large: '15px',
      medium: '10px',
      small: '5px',
      xsmall: '3px',
    },
    borderRadius: '10px',
  },
};

export {defaultTheme};
