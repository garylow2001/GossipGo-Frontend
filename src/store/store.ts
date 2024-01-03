import { configureStore } from '@reduxjs/toolkit';
import threadListReducer from './threads/threadListSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
    reducer: {
        threadList: threadListReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;