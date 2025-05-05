import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FileItem({ item, onPress, onLongPress }) {
  const isDirectory = item.isDirectory;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
    >
      <MaterialIcons
        name={isDirectory ? 'folder' : 'insert-drive-file'}
        size={24}
        color={isDirectory ? '#FFD700' : '#666'}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        {!isDirectory && <Text style={styles.size}>{(item.size / 1024).toFixed(2)} KB</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  size: {
    fontSize: 12,
    color: '#666',
  },
});