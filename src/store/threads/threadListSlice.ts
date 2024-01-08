import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Thread, createThread } from "./threadSlice";

interface ThreadListState {
    threads: Thread[];
    loading: boolean;
    error: string | null;
}

const initialState: ThreadListState = {
    threads: [],
    loading: false,
    error: null,
};

const threadListSlice = createSlice({
    name: "threadList",
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.threads = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThreadList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchThreadList.fulfilled, (state, action) => {
            state.loading = false;
            state.threads = action.payload;
        })
        .addCase(fetchThreadList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        })
        .addCase(createThread.fulfilled, (state, action) => {
            state.loading = false;
            state.threads.push(action.payload);
            state.error = null;
        })
    },
});

export const fetchThreadList = createAsyncThunk(
    "threadList/fetchThreadList",
    async (_, thunkAPI) => {
        const response = await fetch("http://localhost:3000/threads");
        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }
        
        const result = await response.json();
        return result;
    }
);

export default threadListSlice.reducer;