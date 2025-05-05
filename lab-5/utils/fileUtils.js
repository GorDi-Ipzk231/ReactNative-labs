import * as FileSystem from 'expo-file-system';

export async function readDirectory(path) {
  try {
    const items = await FileSystem.readDirectoryAsync(path);
    const fileList = await Promise.all(
      items.map(async (name) => {
        const itemPath = `${path}${name}`;
        const info = await FileSystem.getInfoAsync(itemPath, {
          size: true,
          modificationTime: true,
        });
        return {
          name,
          path: itemPath,
          isDirectory: info.isDirectory,
          size: info.size || 0,
          modificationTime: info.modificationTime || 0,
        };
      })
    );
    return fileList.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}