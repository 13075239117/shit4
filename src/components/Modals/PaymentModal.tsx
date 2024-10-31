import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addPurchase } from '../../store/slices/purchaseSlice';

interface PaymentModalProps {
  file: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (downloadUrl: string) => void;
  isPurchased?: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  file, 
  isOpen, 
  onClose, 
  onSuccess,
  isPurchased = false
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  // Simulate payment and API call
  const simulatePayment = async () => {
    setIsPaying(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSuccess(true);
    
    const downloadUrl = `https://api.example.com/download/${file.id}`;
    
    dispatch(addPurchase({
      fileId: file.id,
      fileName: file.name,
      purchaseDate: new Date().toISOString(),
      price: file.price || 99,
      downloadUrl
    }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSuccess(downloadUrl);
  };

  // If already purchased, show download button directly
  if (isPurchased) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">下载文件</h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center gap-4 py-6">
                <p className="text-gray-600">您已购买此文件</p>
                <button
                  onClick={() => onSuccess(`https://api.example.com/download/${file.id}`)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  立即下载
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">支付下载</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 py-6">
              {!isPaying ? (
                <>
                  <QrCode size={200} className="text-gray-800" />
                  <p className="text-lg font-semibold">￥{file?.price || 99}</p>
                  <p className="text-gray-600 text-center">
                    请使用支付宝扫描二维码完成支付
                  </p>
                  <button
                    onClick={simulatePayment}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    模拟支付完成
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  {isSuccess ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check size={32} className="text-white" />
                    </motion.div>
                  ) : (
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                  <p className="text-lg font-semibold">
                    {isSuccess ? '支付成功' : '支付处理中...'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;