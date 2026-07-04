import React, { useEffect, useRef, memo } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Star } from 'lucide-react-native';
import { COLORS, ANIMATION } from './theme';
import styles from './ProductCard.styles';

function ProductCard({ item, index, onPress }) {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * ANIMATION.staggerDelayPerItem;

    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION.fadeInDuration,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    // Stop in-flight animation if the card unmounts mid-stagger
    // (e.g. user clears the search before it finishes).
    return () => animation.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  return (
    <Animated.View
      style={[styles.cardContainer, { opacity, transform: [{ scale }] }]}
    >
      <Pressable
        onPress={() => onPress(item)}
        style={({ pressed }) => [
          styles.card,
          { transform: [{ scale: pressed ? 0.97 : 1 }] },
        ]}
      >
        <LinearGradient
          colors={[COLORS.surfaceTop, COLORS.surfaceBottom]}
          style={styles.gradient}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.category} numberOfLines={1}>
            {item.category}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>

            {item.rating && (
              <View style={styles.ratingBox}>
                <Star size={12} color={COLORS.star} fill={COLORS.star} />
                <Text style={styles.rating}>{item.rating.rate}</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

// index only affects animation timing, not visual output,
// so we don't need to compare it for memo purposes beyond identity.
export default memo(ProductCard, (prev, next) =>
  prev.item.id === next.item.id && prev.index === next.index
);