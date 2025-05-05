import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Device from 'expo-device';

export default function StorageStats({ appDataDir }) {
  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    used: 0,
  });

  useEffect(() => {
    const fetchStorageStats = async () => {
      try {
        // Note: Expo doesn't provide direct access to total/free storage.
        // We'll estimate used storage in AppData and assume a reasonable total.
        const dirInfo = await FileSystem.getInfoAsync(appDataDir, { size: true });
        const used = dirInfo.size / (1024 * 1024); // Convert to MB
        const total = 1024; // Assume 1GB total for simplicity (Expo limitation)
        const free = total - used;

        setStats({
          total: total.toFixed(2),
          free: free.toFixed(2),
          used: used.toFixed(2),
        });
      } catch (error) {
        console.error('Error fetching storage stats:', error);
      }
    };
    fetchStorageStats();
  }, [appDataDir]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Storage Statistics</Text>
      <Text>Total: {stats.total} MB</Text>
      <Text>Used: {stats.used} MB</Text>
      <Text>Free: {stats.free} MB</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});