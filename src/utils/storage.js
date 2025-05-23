import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'TASKS';

export const getTasks = async () => {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTask = async (task) => {
  try {
    const current = await getTasks();
    const updated = [...current, task];
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
  } catch (err) {
    throw err;
  }
};

export const saveAllTasks = async (tasks) => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};