import React from 'react';

const FileGridSkeleton: React.FC = () => {
  return (
    <div className="folder-grid">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="file-card animate-pulse">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileGridSkeleton;