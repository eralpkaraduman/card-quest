import {DefaultTheme} from 'styled-components/native';

const colors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  gray: 'gray',
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
  fontSize: {
    menuItem: '24px',
  },
  colors: {
    background: colors.black,
    main: colors.white,
    secondary: colors.gray,
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
