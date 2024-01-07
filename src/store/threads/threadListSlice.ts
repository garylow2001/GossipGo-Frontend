import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentList } from "../comments/commentSlice";

export interface ThreadState {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    title: string;
    body: string;
    author_id: number;
    author: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        username: string;
    };
}

interface ThreadListState {
    threads: ThreadState[];
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
        .addCase(createThread.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createThread.fulfilled, (state, action) => {
            state.loading = false;
            state.threads.push(action.payload);
            state.error = null;
        })
        .addCase(createThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const fetchThreadList = createAsyncThunk(
    "threadList/fetchThreadList",
    async () => {
        const response = await fetch("http://localhost:3000/threads");
        const data = await response.json();
        return data;
    }
);

export const createThread = createAsyncThunk(
    "threadList/createThread",
    async (payload: { title: string; body: string; }, thunkAPI) => {
        const response = await fetch("http://localhost:3000/threads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.message);
        }

        const data = await response.json();
        return data;
    }
);

export default threadListSlice.reducer;