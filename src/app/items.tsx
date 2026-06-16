import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Avatar from '@/components/ui/Avatar';
import Card from '@/components/ui/Card';
import ErrorState from '@/components/ui/ErrorState';
import Skeleton from '@/components/ui/Skeleton';
import { Spacing } from '@/constants/theme';
import { useGetElementsQuery } from '../services/api';

export default function ItemsScreen() {
  const { data: items = [], isLoading, isError, refetch } = useGetElementsQuery();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
          <View style={styles.listContent}>
            {[1, 2, 3, 4, 5, 6].map((key) => (
              <Card key={key} style={styles.card}>
                <Skeleton width={48} height={48} borderRadius={24} style={{ marginRight: Spacing.three }} />
                <Skeleton width={140} height={18} />
              </Card>
            ))}
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
          <ErrorState onRetry={refetch} message="An unexpected error occurred while fetching data." />
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Avatar uri={item.avatar} name={item.name} id={item.id} style={{ marginRight: Spacing.three }} />
              <ThemedText style={styles.name}>{item.name}</ThemedText>
            </Card>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
  },
  listContent: {
    paddingBottom: Spacing.four,
    gap: Spacing.two,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.two,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
});
