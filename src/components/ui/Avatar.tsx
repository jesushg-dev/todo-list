import { useTheme } from '@/hooks/use-theme';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '../themed-text';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  id?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Avatar({ uri, name = '', size = 48, id, style }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const theme = useTheme();

  const initials = useMemo(() => {
    const names = name.trim().split(' ').filter(Boolean);
    if (names.length === 0) return '?';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }, [name]);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.backgroundSelected
        },
        style
      ]}
    >
      {(!uri || hasError) ? (
        <ThemedText style={[styles.initials, { fontSize: size * 0.4 }]}>
          {initials}
        </ThemedText>
      ) : (
        <Image
          source={{ uri }}
          style={styles.image}
          contentFit="cover"
          transition={250}
          cachePolicy="memory-disk"
          recyclingKey={id}
          onError={() => setHasError(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initials: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
