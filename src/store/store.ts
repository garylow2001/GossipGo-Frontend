import { configureStore } from '@reduxjs/toolkit';
import threadListReducer from './threads/threadListSlice';
import authReducer from './auth/authSlice';
import commentReducer from './comments/commentSlice';
import commentListReducer from './comments/commentListSlice';
import threadReducer from './threads/threadSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        thread: threadReducer,
        threadList: threadListReducer,
        comment: commentReducer,
        commentList: commentListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;