import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function FileViewer({ visible, filePath, onClose }) {
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');

  useEffect(() => {
    if (visible && filePath) {
      const loadFile = async () => {
        try {
          const fileContent = await FileSystem.readAsStringAsync(filePath);
          setContent(fileContent);
          setOriginalContent(fileContent);
        } catch (error) {
          Alert.alert('Error', 'Failed to read file');
        }
      };
      loadFile();
    }
  }, [visible, filePath]);

  const handleSave = async () => {
    try {
      await FileSystem.writeAsStringAsync(filePath, content);
      setOriginalContent(content);
      Alert.alert('Success', 'File saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save file');
    }
  };

  const handleClose = () => {
    if (content !== originalContent) {
      Alert.alert(
        'Unsaved Changes',
        'You have unsaved changes. Save before closing?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', onPress: onClose },
          { text: 'Save', onPress: handleSave },
        ]
      );
    } else {
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.header}>Edit File</Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={content}
          onChangeText={setContent}
          placeholder="File content"
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Close" onPress={handleClose} color="red" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});