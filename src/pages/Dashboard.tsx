import React from 'react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import FileGrid from '../components/FileExplorer/FileGrid';
import ChatAssistant from '../components/Chat/ChatAssistant';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <motion.main 
          className="flex-1 overflow-y-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FileGrid />
        </motion.main>
      </div>
      <ChatAssistant />
    </div>
  );
};

export default Dashboard;