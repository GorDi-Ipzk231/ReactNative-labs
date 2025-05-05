import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import FileItem from '../components/FileItem';
import FileViewer from '../components/FileViewer';
import CreateModal from '../components/CreateModal';
import DeleteModal from '../components/DeleteModal';
import FileInfoModal from '../components/FileInfoModal';
import StorageStats from '../components/StorageStats';
import { readDirectory } from '../utils/fileUtils';

export default function FileManagerScreen({ appDataDir }) {
  const [currentPath, setCurrentPath] = useState(appDataDir);
  const [files, setFiles] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFileInfoModal, setShowFileInfoModal] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadFiles = async () => {
    const fileList = await readDirectory(currentPath);
    setFiles(fileList);
  };

  useEffect(() => {
    loadFiles();
  }, [currentPath]);

  const handleItemPress = (item) => {
    if (item.isDirectory) {
      setCurrentPath(`${item.path}/`);
    } else if (item.name.endsWith('.txt')) {
      setSelectedItem(item);
      setShowFileViewer(true);
    } else {
      Alert.alert('Error', 'Only .txt files can be opened');
    }
  };

  const handleItemLongPress = (item) => {
    setSelectedItem(item);
    setShowFileInfoModal(true);
  };

  const handleGoBack = () => {
    if (currentPath !== appDataDir) {
      const parentPath = currentPath.split('/').slice(0, -2).join('/') + '/';
      setCurrentPath(parentPath);
    }
  };

  const getBreadcrumb = () => {
    const parts = currentPath.replace(appDataDir, 'AppData/').split('/').filter(Boolean);
    return parts.join(' > ');
  };

  return (
    <View style={styles.container}>
      <StorageStats appDataDir={appDataDir} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleGoBack}
          disabled={currentPath === appDataDir}
          style={styles.backButton}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={currentPath === appDataDir ? '#ccc' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.path} numberOfLines={1}>
          {getBreadcrumb()}
        </Text>
        <TouchableOpacity onPress={() => setShowCreateModal(true)}>
          <MaterialIcons name="add" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={files}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <FileItem
            item={item}
            onPress={handleItemPress}
            onLongPress={handleItemLongPress}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No files or folders</Text>}
      />
      <CreateModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        currentPath={currentPath}
        onCreate={loadFiles}
      />
      <DeleteModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        item={selectedItem}
        onDelete={loadFiles}
      />
      <FileInfoModal
        visible={showFileInfoModal}
        onClose={() => setShowFileInfoModal(false)}
        item={selectedItem}
      />
      <FileViewer
        visible={showFileViewer}
        filePath={selectedItem?.path}
        onClose={() => setShowFileViewer(false)}
      />
      <Button
        title="Delete Selected"
        onPress={() => setShowDeleteModal(true)}
        disabled={!selectedItem}
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  path: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});