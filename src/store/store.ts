import { configureStore } from '@reduxjs/toolkit';
import threadListReducer from './threads/threadListSlice';
import authReducer from './auth/authSlice';
import commentReducer from './comments/commentSlice';
import commentListReducer from './comments/commentListSlice';

export const store = configureStore({
    reducer: {
        threadList: threadListReducer,
        auth: authReducer,
        comment: commentReducer,
        commentList: commentListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;