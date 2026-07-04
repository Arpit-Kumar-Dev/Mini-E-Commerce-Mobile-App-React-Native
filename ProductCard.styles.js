import { StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from './theme';

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    maxWidth: LAYOUT.cardMaxWidth,
    marginBottom: 18,
  },
  card: {
    borderRadius: LAYOUT.cardRadius,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    borderRadius: LAYOUT.cardRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: '100%',
    height: LAYOUT.imageHeight,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    minHeight: 40,
  },
  category: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 6,
    textTransform: 'capitalize',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.chipBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
