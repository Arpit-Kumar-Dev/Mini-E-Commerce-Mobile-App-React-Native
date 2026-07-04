import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from './theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchBg,
    margin: 20,
    borderRadius: LAYOUT.searchRadius,
    paddingHorizontal: 18,
    height: LAYOUT.searchHeight,
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
});
