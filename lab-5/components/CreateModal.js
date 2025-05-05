import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function CreateModal({ visible, onClose, currentPath, onCreate }) {
  const [name, setName] = useState('');
  const [isFolder, setIsFolder] = useState(true);
  const [content, setContent] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    try {
      const targetPath = `${currentPath}${name}${isFolder ? '/' : '.txt'}`;
      if (isFolder) {
        await FileSystem.makeDirectoryAsync(targetPath, { intermediates: true });
      } else {
        await FileSystem.writeAsStringAsync(targetPath, content);
      }
      setName('');
      setContent('');
      onCreate();
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create item');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Create {isFolder ? 'Folder' : 'File'}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />
          {!isFolder && (
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={content}
              onChangeText={setContent}
              multiline
              placeholder="Initial content"
            />
          )}
          <View style={styles.buttonContainer}>
            <Button title={isFolder ? 'Folder' : 'File'} onPress={() => setIsFolder(!isFolder)} />
            <Button title="Create" onPress={handleCreate} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});