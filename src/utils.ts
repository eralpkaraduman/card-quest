import {useTheme} from 'styled-components/native';
import {useWindowDimensions} from 'react-native';

export function useWindowAttributes() {
  const {width} = useWindowDimensions();
  const {getWindowSize} = useTheme();
  const windowSize = getWindowSize(width);
  const narrow = windowSize.small || windowSize.xsmall;
  return {...windowSize, narrow};
}
