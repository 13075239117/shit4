import { FileItem } from './files';

export const mockAuth = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (email === 'demo@example.com' && password === 'password') {
      return { id: '1', email, name: 'Demo User', token: 'mock-jwt-token' };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (name: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { id: '1', email, name, token: 'mock-jwt-token' };
  }
};

export const mockFiles: FileItem[] = [
  {
    id: 1,
    name: "Java项目",
    type: "folder",
    path: "/Java项目",
    children: [
      {
        id: 11,
        name: "在线商城",
        type: "folder",
        path: "/Java项目/在线商城",
        children: [
          {
            id: 111,
            name: "商城源码.zip",
            type: "file",
            path: "/Java项目/在线商城/商城源码.zip",
            children: [],
            price: 99
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Python项目",
    type: "folder",
    path: "/Python项目",
    children: [
      {
        id: 21,
        name: "人工智能",
        type: "folder",
        path: "/Python项目/人工智能",
        children: [
          {
            id: 211,
            name: "机器学习实战.zip",
            type: "file",
            path: "/Python项目/人工智能/机器学习实战.zip",
            children: [],
            price: 199
          }
        ]
      }
    ]
  }
];