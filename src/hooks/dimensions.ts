import {WindowSizeClass} from '@/global';
import {useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {useTheme} from 'styled-components/native';

export function useWindowHeight(): number {
  const {height} = useWindowDimensions();
  const [value, setValue] = useState(height);
  useEffect(() => {
    setValue(height);
  }, [height]);
  return value;
}

export function useWindowWidth(): number {
  const {width} = useWindowDimensions();
  const [value, setValue] = useState(width);
  useEffect(() => {
    setValue(width);
  }, [width]);
  return value;
}

export function useWindowSizeAttributes() {
  const width = useWindowWidth();
  const {getWindowSizeClass} = useTheme();
  const size = getWindowSizeClass(width);
  const narrow = size.small || size.xsmall;
  return {...size, narrow};
}
