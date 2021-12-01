import {StyleSheet} from 'react-native';
import {colors} from '../colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonText: {
    backgroundColor: colors.white,
    color: colors.black,
    padding: 8,
    textAlign: 'center',
  },
  numberText: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
    padding: 8,
  },
});
