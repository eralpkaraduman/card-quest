import {DefaultTheme} from 'styled-components/native';

const colors: Record<string, string> = {
  black: '#212121',
  white: '#ffffff',
  gray: '#757575',
  red: '#FF5252',
  yellow: '#FFC107',
  blue: '#448AFF',
  green: '#388E3C',
};

const defaultTheme: DefaultTheme = {
  getWindowSize: (width: number) => {
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
    menuItem: '24px',
  },
  colors: {
    background: colors.black,
    main: colors.white,
    secondary: colors.gray,
    white: colors.white,
    red: colors.red,
    gray: colors.gray,
    yellow: colors.yellow,
    blue: colors.blue,
    green: colors.green,
    potion: colors.red,
    shield: colors.blue,
    monster: colors.green,
  },
  dimensions: {
    padding: {
      large: 15,
      medium: 10,
      small: 5,
      xsmall: 3,
    },
  },
};

export {defaultTheme};
