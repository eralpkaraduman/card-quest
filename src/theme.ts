import {DefaultTheme} from 'styled-components/native';

const colors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  gray: 'gray',
};

const defaultTheme: DefaultTheme = {
  fontSize: {
    menuItem: '24px',
  },
  colors: {
    background: colors.black,
    main: colors.white,
    secondary: colors.gray,
  },
};

export {defaultTheme};
