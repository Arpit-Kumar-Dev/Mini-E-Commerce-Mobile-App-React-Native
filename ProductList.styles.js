import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTextGroup: {
    flex: 1,
  },
  heading: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subHeading: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.searchBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderStrong,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  cartBadgeText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textMuted,
    marginTop: 16,
    textAlign: 'center',
  },
});