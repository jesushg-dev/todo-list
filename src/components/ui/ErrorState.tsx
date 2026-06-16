import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SymbolView } from 'expo-symbols';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function ErrorState({
  title = 'Oops!',
  message = 'An unexpected error occurred.',
  onRetry,
  style
}: ErrorStateProps) {
  const theme = useTheme();

  return (
    <ThemedView style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.backgroundSelected }]}>
        <SymbolView name="wifi.exclamationmark" size={64} tintColor={theme.textSecondary} />
      </View>
      <ThemedText style={styles.title} type="title">
        {title}
      </ThemedText>
      <ThemedText style={styles.errorText} themeColor="textSecondary">
        {message}
      </ThemedText>
      {onRetry && (
        <Button
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          style={styles.button}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.four,
  },
  title: {
    marginBottom: Spacing.two,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.six,
    maxWidth: '80%',
    lineHeight: 24,
  },
  button: {
    minWidth: 160,
  }
});
