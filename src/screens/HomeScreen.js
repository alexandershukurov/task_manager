import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import { getTasks } from '../utils/storage';
import { useTheme } from '@react-navigation/native';

const HomeScreen = ({
  navigation,
  useSystemTheme,
  setUseSystemTheme,
  manualTheme,
  setManualTheme,
}) => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const { colors } = useTheme();

  const loadTasks = async () => {
    const savedTasks = await getTasks();
    setTasks(savedTasks);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const getSortedTasks = () => {
    if (sortBy === 'status') {
      return [...tasks].sort((a, b) => a.status.localeCompare(b.status));
    } else {
      return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const toggleTheme = () => {
    if (useSystemTheme) {
      setUseSystemTheme(false);
      setManualTheme('dark');
    } else {
      setManualTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskCard, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('TaskDetail', { task: item })}
    >
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.datetime, { color: colors.text }]}>{item.datetime}</Text>
      <Text style={[styles.status, { color: colors.text }]}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
        <Button
          title={sortBy === 'date' ? 'Sort: Date' : 'Sort: Status'}
          onPress={() => setSortBy(sortBy === 'date' ? 'status' : 'date')}
        />
        <Button
          title={
            useSystemTheme
              ? 'Theme: System'
              : manualTheme === 'dark'
              ? 'Theme: Dark'
              : 'Theme: Light'
          }
          onPress={toggleTheme}
          onLongPress={() => setUseSystemTheme(true)}
        />
      </View>

      <FlatList
        data={getSortedTasks()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10, paddingVertical: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 16,
  },
  taskCard: {
    padding: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  datetime: {
    fontSize: 14,
  },
  status: {
    fontSize: 13,
    marginTop: 4,
  },
});

export default HomeScreen;