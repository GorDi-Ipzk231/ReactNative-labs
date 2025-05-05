import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function DeleteModal({ visible, onClose, item, onDelete }) {
  const handleDelete = async () => {
    try {
      if (item.isDirectory) {
        await FileSystem.deleteAsync(item.path, { idempotent: true });
      } else {
        await FileSystem.deleteAsync(item.path);
      }
      onDelete();
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>
            Delete {item?.name}?
          </Text>
          <Text style={styles.warning}>
            This action cannot be undone.
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Delete" onPress={handleDelete} color="red" />
            <Button title="Cancel" onPress={onClose} />
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
  warning: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});