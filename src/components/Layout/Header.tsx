import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, User, Globe, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { logout } from '../../store/slices/authSlice';
import type { RootState } from '../../store/store';

const PurchaseHistory: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const purchases = useSelector((state: RootState) => state.purchases.purchases);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">购买记录</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                关闭
              </button>
            </div>

            {purchases.length === 0 ? (
              <p className="text-center text-gray-500 py-8">暂无购买记录</p>
            ) : (
              <div className="space-y-4">
                {purchases.map((purchase, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{purchase.fileName}</h4>
                        <p className="text-sm text-gray-500">
                          购买时间: {new Date(purchase.purchaseDate).toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-600">￥{purchase.price}</p>
                      </div>
                      <button
                        onClick={() => window.open(purchase.downloadUrl, '_blank')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        下载
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [showPurchases, setShowPurchases] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold text-white text-center flex-1"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            1900套计算机专业毕设项目代码资料大合集
          </motion.h1>
          
          {user && (
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              >
                <Globe size={18} />
                <span>{i18n.language.toUpperCase()}</span>
              </button>

              <button
                onClick={() => setShowPurchases(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              >
                <ShoppingBag size={18} />
                <span>购买记录</span>
              </button>

              <div className="flex items-center gap-2 text-white">
                <User size={20} />
                <span>{user.name}</span>
              </div>
              
              <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-500/20 transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>{t('auth.logout')}</span>
              </button>
            </motion.div>
          )}
        </div>
      </header>

      <PurchaseHistory 
        isOpen={showPurchases} 
        onClose={() => setShowPurchases(false)} 
      />
    </>
  );
};

export default Header;