import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Spacing } from '@/constants/theme';
import AddTaskModal from '../components/AddTaskModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask } from '../store/slices/tasksSlice';

export default function TasksScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const tasks = useAppSelector((state) => state.tasks.items);
  const dispatch = useAppDispatch();

  const handleAddTask = (description: string) => {
    dispatch(addTask(description));
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
        <View style={styles.header}>
          <Button
            variant="outline"
            title="New Task"
            onPress={() => setModalVisible(true)}
            style={styles.newTaskButton}
          />
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Card style={styles.taskCard}>
              <ThemedText style={styles.taskText}>{item.description}</ThemedText>
            </Card>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText} themeColor="textSecondary">
                No tasks available. Create a new one!
              </ThemedText>
            </View>
          }
        />

        <AddTaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={handleAddTask}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
  },
  header: {
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  newTaskButton: {
    width: '100%',
  },
  listContent: {
    paddingBottom: Spacing.four,
    gap: Spacing.two,
  },
  taskCard: {
    borderRadius: Spacing.one,
  },
  taskText: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.six,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
