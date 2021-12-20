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

declare interface WindowSize {
  xlarge?: boolean;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
  xsmall?: boolean;
}

// We declare theme interface so we get no type errors, also typesafe theme values
// See: https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    getWindowSize: (width: number) => WindowSize;
    fontSize: {
      menuItem: string;
    };
    colors: {
      background: string;
      main: string;
      secondary: string;
      white: string;
      red: string;
      gray: string;
      yellow: string;
    };
    dimensions: {
      padding: {
        large: number;
        medium: number;
        small: number;
        xsmall: number;
      };
    };
  }
}
