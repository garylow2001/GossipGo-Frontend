import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Thread {
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

interface UpdateThreadPayload {
    ID: number;
    title: string;
    body: string;
}

interface ThreadState {
    thread: Thread | null;
    loading: boolean;
    error: string | null;
}

const initialState: ThreadState = {
    thread: null,
    loading: false,
    error: null,
}

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchThread.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchThread.fulfilled, (state, action) => {
            state.loading = false;
            state.thread = action.payload;
        })
        .addCase(fetchThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        })
        .addCase(createThread.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createThread.fulfilled, (state, action) => {
            state.loading = false;
            state.thread = action.payload;
            state.error = null;
        })
        .addCase(createThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        })
        .addCase(updateThread.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateThread.fulfilled, (state, action) => {
            state.loading = false;
            state.thread = action.payload;
            state.error = null;
        })
        .addCase(updateThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? null;
        })
    }
});

export const fetchThread = createAsyncThunk(
    "thread/fetchThread",
    async (threadId: string, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadId}`);

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.message);
        }

        const data = await response.json();
        return data;
    }
);

export const createThread = createAsyncThunk(
    "thread/createThread",
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

export const updateThread = createAsyncThunk(
  'thread/updateThread',
  async (thread: UpdateThreadPayload, thunkAPI) => {
    const response = await fetch(`http://localhost:3000/threads/${thread.ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(thread),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return thunkAPI.rejectWithValue(errorResponse.message);
    }

    const data = await response.json();
    return data;
  }
);

export default threadSlice.reducer;