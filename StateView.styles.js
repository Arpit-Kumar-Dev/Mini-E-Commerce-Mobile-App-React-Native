import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export default StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateText: {
    fontSize: 15,
    color: COLORS.textMuted,
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  retryButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 20,
  },
  retryText: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
});
