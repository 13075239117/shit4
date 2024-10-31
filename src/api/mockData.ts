export const mockFolders = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    path: '/Documents',
    parentId: null,
    modifiedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    path: '/Images',
    parentId: null,
    modifiedAt: new Date().toISOString(),
  },
];

export const mockFiles = [
  {
    id: '3',
    name: 'report.pdf',
    type: 'document',
    path: '/Documents/report.pdf',
    parentId: '1',
    modifiedAt: new Date().toISOString(),
    size: 1024576,
  },
  {
    id: '4',
    name: 'vacation.jpg',
    type: 'image',
    path: '/Images/vacation.jpg',
    parentId: '2',
    modifiedAt: new Date().toISOString(),
    size: 2048576,
  },
];