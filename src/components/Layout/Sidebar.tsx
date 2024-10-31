import React, { useEffect, useState } from 'react';
import { Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setSelectedFolder } from '../../store/slices/filesSlice';
import type { RootState } from '../../store/store';
import { fetchFiles, FileItem } from '../../api/files';

const FolderTree: React.FC<{ folder: FileItem; level: number }> = ({
  folder,
  level,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const selectedFolder = useSelector(
    (state: RootState) => state.files.selectedFolder
  );

  const hasChildren = folder.children?.some((child) => child.type === 'Folder');

  return (
    <div style={{ marginLeft: `${level * 12}px` }}>
      <motion.div
        whileHover={{ x: 4 }}
        className={`sidebar-item group ${
          selectedFolder === folder.id.toString() ? 'active' : ''
        }`}
        onClick={() => {
          dispatch(setSelectedFolder(folder.id.toString()));
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center justify-center w-[24px]">
          {hasChildren ? (
            isOpen ? (
              <ChevronDown size={18} className="flex-shrink-0" />
            ) : (
              <ChevronRight size={18} className="flex-shrink-0" />
            )
          ) : (
            <div className="w-[18px]" />
          )}
        </div>
        <Folder size={18} className="flex-shrink-0" />
        <div className="relative flex-1 min-w-0">
          <span className="truncate block" title={folder.name}>
            {folder.name}
          </span>
          <div className="absolute left-0 top-[-24px] bg-gray-900 text-white px-2 py-1 rounded text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity z-50 whitespace-normal max-w-[200px] break-words">
            {folder.name}
          </div>
        </div>
      </motion.div>

      {isOpen &&
        folder.children
          ?.filter((child) => child.type === 'Folder')
          .map((child) => (
            <FolderTree key={child.id} folder={child} level={level + 1} />
          ))}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [folders, setFolders] = useState<FileItem[]>([]);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(356);
  const minWidth = 200;
  const maxWidth =
    typeof window !== 'undefined' ? window.innerWidth * 0.5 : 800;

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const data = await fetchFiles(null);
        setFolders(data);
      } catch (error) {
        console.error('Error loading folders:', error);
      }
    };

    loadFolders();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = e.clientX;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, maxWidth]);

  return (
    <>
      <div
        className="bg-gradient-to-b from-blue-50 to-indigo-50 border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0"
        style={{ width: sidebarWidth, height: '100%', overflowX: 'hidden' }}
      >
        <div className="p-4">
          {folders.map((folder) => (
            <FolderTree key={folder.id} folder={folder} level={0} />
          ))}
        </div>
      </div>
      <div className="resize-handle" onMouseDown={() => setIsResizing(true)} />
    </>
  );
};

export default Sidebar;
