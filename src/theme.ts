import {DefaultTheme} from 'styled-components/native';

const colors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  gray: 'gray',
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      main: string;
      secondary: string;
    };
  }
}

const defaultTheme: DefaultTheme = {
  colors: {
    background: colors.black,
    main: colors.white,
    secondary: colors.gray,
  },
};

export {defaultTheme};
