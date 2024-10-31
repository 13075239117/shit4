import { api, handleApiError } from './config';

export interface FileItem {
  id: number;
  name: string;
  type: string;
  path: string;
  children: FileItem[];
}

export const fetchFiles = async (folderId: string | null = null): Promise<FileItem[]> => {
  try {
    // For development, we'll fetch from the local JSON file
    const response = await fetch('/fileData.json');
    const data = await response.json();
    
    if (folderId) {
      // If folderId is provided, find the folder and return its children
      const findFolder = (items: FileItem[]): FileItem[] => {
        for (const item of items) {
          if (item.id.toString() === folderId) {
            return item.children;
          }
          if (item.children.length > 0) {
            const result = findFolder(item.children);
            if (result.length > 0) return result;
          }
        }
        return [];
      };
      return findFolder(data);
    }
    
    // If no folderId, return root level items
    return data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};