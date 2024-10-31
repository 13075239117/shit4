import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import filesReducer from './slices/filesSlice';
import purchaseReducer from './slices/purchaseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    files: filesReducer,
    purchases: purchaseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;