import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThreadLike } from "./threadSlice";

interface ThreadLikeState {
    loading: boolean;
    createError: string | null;
    deleteError: string | null;
}

const initialState: ThreadLikeState = {
    loading: false,
    createError: null,
    deleteError: null,
}

const threadLikeSlice = createSlice({
    name: 'threadLike',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createThreadLike.fulfilled, (state, action) => {
            state.loading = false;
            state.createError = null;
        })
            .addCase(createThreadLike.pending, (state) => {
                state.loading = true;
                state.createError = null;
            })
            .addCase(createThreadLike.rejected, (state, action) => {
                state.loading = false;
                state.createError = action.payload as string;
            })
            .addCase(deleteThreadLike.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteError = null;
            })
            .addCase(deleteThreadLike.pending, (state) => {
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

        const data = await response.json();
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

        const data = await response.json();
        return { threadId, data };
    }
)

export default threadLikeSlice.reducer;