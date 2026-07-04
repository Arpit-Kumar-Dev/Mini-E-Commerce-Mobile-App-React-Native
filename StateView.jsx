import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloudOff } from 'lucide-react-native';
import { COLORS } from './theme';
import styles from './StateView.styles';

/**
 * Full-screen loading / error state.
 * Pass `onRetry` to show a retry button (error state);
 * omit it for a plain loading spinner.
 * Pass a Lucide icon component via `Icon` to override the default (CloudOff).
 */
export default function StateView({
  loading = false,
  Icon = CloudOff,
  message,
  onRetry,
}) {
  return (
    <SafeAreaView style={styles.centered}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.accent} />
      ) : (
        <Icon size={60} color={COLORS.textSecondary} />
      )}

      <Text style={styles.stateText}>{message}</Text>

      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}