import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TaskItem({ task }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <Text style={styles.progress}>
        {task.current}/{task.goal}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  progress: {
    fontSize: 16,
    color: '#007AFF',
  },
});