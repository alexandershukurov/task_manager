import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { saveTask } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@react-navigation/native';

const AddTaskScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState('');
  const [location, setLocation] = useState('');

  const handleSave = async () => {
    if (!title || !datetime || !location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      datetime,
      location,
      status: 'Not Started',
      createdAt: new Date().toISOString(),
    };

    try {
      await saveTask(newTask);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.label, { color: colors.text }]}>Title *</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter task title"
        placeholderTextColor={colors.text + '88'}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, { color: colors.text }]}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80, color: colors.text, borderColor: colors.border }]}
        placeholder="Enter description (optional)"
        placeholderTextColor={colors.text + '88'}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={[styles.label, { color: colors.text }]}>Date & Time *</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="e.g., 2025-05-23 14:30"
        placeholderTextColor={colors.text + '88'}
        value={datetime}
        onChangeText={setDatetime}
      />

      <Text style={[styles.label, { color: colors.text }]}>Location *</Text>
      <TextInput
        style={[styles.input, { color: colors.text, borderColor: colors.border }]}
        placeholder="Enter location"
        placeholderTextColor={colors.text + '88'}
        value={location}
        onChangeText={setLocation}
      />

      <Button title="Save Task" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    flexGrow: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default AddTaskScreen;