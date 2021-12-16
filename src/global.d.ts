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

// We declare theme interface so we get no type errors, also typesafe theme values
// See: https://styled-components.com/docs/api#create-a-declarations-file
declare module 'styled-components' {
  export interface DefaultTheme {
    fontSize: {
      menuItem: string;
    };
    colors: {
      background: string;
      main: string;
      secondary: string;
    };
    dimensions: {
      padding: {
        medium: number;
        small: number;
        xsmall: number;
      };
    };
  }
}
