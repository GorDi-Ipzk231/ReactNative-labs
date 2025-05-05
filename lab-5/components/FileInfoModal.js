import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export default function FileInfoModal({ visible, onClose, item }) {
  if (!item) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getFileType = (name) => {
    const extension = name.split('.').pop()?.toLowerCase();
    return extension ? extension.toUpperCase() : 'Unknown';
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>File Information</Text>
          <Text style={styles.info}>Name: {item.name}</Text>
          <Text style={styles.info}>Type: {item.isDirectory ? 'Folder' : getFileType(item.name)}</Text>
          {!item.isDirectory && (
            <Text style={styles.info}>Size: {(item.size / 1024).toFixed(2)} KB</Text>
          )}
          <Text style={styles.info}>
            Last Modified: {formatDate(item.modificationTime * 1000)}
          </Text>
          <Button title="Close" onPress={onClose} />
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
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});