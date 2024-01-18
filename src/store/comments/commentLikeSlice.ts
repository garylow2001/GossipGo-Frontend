import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentLike } from "./commentSlice";

interface CommentLikeState {
    threadID: number | null;
    commentIDonThread: number | null;
    loading: boolean;
    createError: string | null;
    deleteError: string | null;
}

const initialState: CommentLikeState = {
    threadID: null,
    commentIDonThread: null,
    loading: false,
    createError: null,
    deleteError: null,
}

const commentLikeSlice = createSlice({
    name: 'commentLike',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCommentLike.fulfilled, (state) => {
            state.loading = false;
            state.createError = null;
        })
            .addCase(createCommentLike.pending, (state, action) => {
                state.threadID = action.meta.arg.threadID;
                state.commentIDonThread = action.meta.arg.commentID;
                state.loading = true;
                state.createError = null;
            })
            .addCase(createCommentLike.rejected, (state, action) => {
                state.loading = false;
                state.createError = action.payload as string;
            })
            .addCase(deleteCommentLike.fulfilled, (state) => {
                state.loading = false;
                state.deleteError = null;
            })
            .addCase(deleteCommentLike.pending, (state, action) => {
                state.threadID = action.meta.arg.threadID;
                state.commentIDonThread = action.meta.arg.commentID;
                state.loading = true;
                state.deleteError = null;
            })
            .addCase(deleteCommentLike.rejected, (state, action) => {
                state.loading = false;
                state.deleteError = action.payload as string;
            })
    }
})

export const createCommentLike = createAsyncThunk(
    'commentLike/createCommentLike',
    async ({ threadID, commentID }: { threadID: number, commentID: number }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadID}/comments/${commentID}/like`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const data: CommentLike = await response.json();
        return { threadID, commentID, data };
    }
);

export const deleteCommentLike = createAsyncThunk(
    'commentLike/deleteCommentLike',
    async ({ threadID, commentID }: { threadID: number, commentID: number }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadID}/comments/${commentID}/like`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const data: CommentLike = await response.json();
        return { threadID, commentID, data };
    }
);

export default commentLikeSlice.reducer;