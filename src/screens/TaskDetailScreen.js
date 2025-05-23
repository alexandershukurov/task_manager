import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  Alert,
} from 'react-native';
import { getTasks, saveAllTasks } from '../utils/storage';
import { useTheme } from '@react-navigation/native';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;
  const { colors } = useTheme();

  const updateStatus = async (newStatus) => {
    const tasks = await getTasks();
    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );
    await saveAllTasks(updated);
    navigation.goBack();
  };

  const deleteTask = async () => {
    if (Platform.OS === 'web') {
      const confirm = window.confirm('Are you sure you want to delete this task?');
      if (!confirm) return;
    } else {
      const confirmed = await new Promise((resolve) => {
        Alert.alert(
          'Delete Task',
          'Are you sure you want to delete this task?',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
            { text: 'Delete', style: 'destructive', onPress: () => resolve(true) },
          ],
          { cancelable: true }
        );
      });

      if (!confirmed) return;
    }

    try {
      const tasks = await getTasks();
      const filtered = tasks.filter((t) => t.id !== task.id);
      await saveAllTasks(filtered);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err.message || 'Something went wrong while deleting the task.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{task.title}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Description: {task.description || 'N/A'}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Date & Time: {task.datetime}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Location: {task.location}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Status: {task.status}</Text>

      <View style={styles.buttonGroup}>
        <Button title="Mark In Progress" onPress={() => updateStatus('In Progress')} />
        <Button title="Mark Completed" onPress={() => updateStatus('Completed')} />
        <Button title="Cancel Task" onPress={() => updateStatus('Cancelled')} />
        <Button title="Delete Task" color="red" onPress={deleteTask} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 20,
    gap: 10,
  },
});

export default TaskDetailScreen;