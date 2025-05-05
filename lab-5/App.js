import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import FileManagerScreen from './screens/FileManagerScreen';

const APP_DATA_DIR = `${FileSystem.documentDirectory}AppData/`;

export default function App() {
  useEffect(() => {
    // Create AppData directory if it doesn't exist
    const initAppDataDir = async () => {
      const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
      }
    };
    initAppDataDir();
  }, []);

  return (
    <View style={styles.container}>
      <FileManagerScreen appDataDir={APP_DATA_DIR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});