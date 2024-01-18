import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThreadLike } from "./threadSlice";

interface ThreadLikeState {
    loading: boolean;
    threadId: number | null;
    createError: string | null;
    deleteError: string | null;
}

const initialState: ThreadLikeState = {
    loading: false,
    threadId: null,
    createError: null,
    deleteError: null,
}

const threadLikeSlice = createSlice({
    name: 'threadLike',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createThreadLike.fulfilled, (state) => {
            state.loading = false;
            state.createError = null;
        })
            .addCase(createThreadLike.pending, (state, action) => {
                state.threadId = action.meta.arg;
                state.loading = true;
                state.createError = null;
            })
            .addCase(createThreadLike.rejected, (state, action) => {
                state.loading = false;
                state.createError = action.payload as string;
            })
            .addCase(deleteThreadLike.fulfilled, (state) => {
                state.loading = false;
                state.deleteError = null;
            })
            .addCase(deleteThreadLike.pending, (state, action) => {
                state.threadId = action.meta.arg;
                state.loading = true;
            })
            .addCase(deleteThreadLike.rejected, (state, action) => {
                state.loading = false;
                state.deleteError = action.payload as string;
            })
    }
})

export const createThreadLike = createAsyncThunk(
    'threadLike/createThreadLike',
    async (threadId: number, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadId}/like`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const data: ThreadLike = await response.json();
        return { threadId, data };
    }
)

export const deleteThreadLike = createAsyncThunk(
    'threadLike/deleteThreadLike',
    async (threadId: number, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadId}/like`, {
            method: 'DELETE',
            credentials: 'include',
        });


        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const data: ThreadLike = await response.json();
        return { threadId, data };
    }
)

export default threadLikeSlice.reducer;