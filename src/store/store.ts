import { configureStore } from '@reduxjs/toolkit';
import threadListReducer from './threads/threadListSlice';

export const store = configureStore({
    reducer: {
        threadList: threadListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;