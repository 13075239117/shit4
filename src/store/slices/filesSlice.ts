import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  path: string;
  parentId: string | null;
}

interface FilesState {
  items: FileItem[];
  currentPath: string;
  loading: boolean;
  selectedFolder: string | null;
}

const initialState: FilesState = {
  items: [],
  currentPath: '/',
  loading: false,
  selectedFolder: null,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<FileItem[]>) => {
      state.items = action.payload;
    },
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedFolder: (state, action: PayloadAction<string | null>) => {
      state.selectedFolder = action.payload;
    },
  },
});

export const { setFiles, setCurrentPath, setLoading, setSelectedFolder } = filesSlice.actions;
export default filesSlice.reducer;