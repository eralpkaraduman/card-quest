import 'react-native';
import 'styled-components';

// react-native Text doesn't have href prop, but react-native-has, we need to redeclare so ts compiler doesn't worry about it.
// See: https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces
// See href here: https://necolas.github.io/react-native-web/docs/accessibility/#links
declare module 'react-native' {
  export interface TextProps {
    href?: string;
  }
}

declare interface PxSize {
  xlarge: string;
  large: string;
  medium: string;
  small: string;
  xsmall: string;
}

declare interface WindowSizeClass {
  xlarge?: boolean;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  xsmall?: boolean;
}

declare interface TextStyle {
  title: string;
  subtitle: string;
  body: string;
}

// We declare theme interface so we get no type errors, also type safe theme values
// See: https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    getWindowSizeClass: (width: number) => WindowSizeClass;
    alphaColor: (color: string, opacity: number) => string;
    fontSize: PxSize;
    fontFamily: TextStyle;
    fontWeight: TextStyle;
    colors: {
      background: string;
      main: string;
      secondary: string;
      white: string;
      red: string;
      gray: string;
      darkGray: string;
      yellow: string;
      blue: string;
      green: string;
      potion: string;
      shield: string;
      monster: string;
    };
    dimensions: {
      padding: PxSize;
      borderRadius: string;
    };
  }
}
