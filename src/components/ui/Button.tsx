import { useMemo } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title: string;
}

export default function Button({
  variant = 'primary',
  style,
  textStyle,
  title,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const variantStyles = useMemo(() => {
    const stylesMap: Record<string, { container: StyleProp<ViewStyle>; text: StyleProp<TextStyle> }> = {
      primary: {
        container: { backgroundColor: theme.primary },
        text: { color: theme.primaryForeground },
      },
      secondary: {
        container: { backgroundColor: theme.backgroundElement },
        text: { color: theme.text },
      },
      outline: {
        container: {
          backgroundColor: isDark ? 'rgba(32, 138, 239, 0.15)' : '#D1E7FF',
          borderWidth: 1,
          borderColor: isDark ? '#4DABF5' : '#208AEF',
        },
        text: { color: isDark ? '#4DABF5' : '#0056B3', fontWeight: 'bold' as const },
      },
    };

    return stylesMap[variant] || { container: {}, text: {} };
  }, [variant, isDark, theme]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variantStyles.container,
        disabled && { opacity: 0.4 },
        pressed && !disabled && styles.pressed,
        style as ViewStyle,
      ]}
      disabled={disabled}
      {...props}
    >
      <ThemedText style={[styles.text, variantStyles.text, textStyle]} type="default">
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
