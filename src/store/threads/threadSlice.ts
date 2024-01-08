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
    fetchError: string | null;
    createError: string | null;
    updateError: string | null;
    deleteError: string | null;
}

const initialState: ThreadState = {
    thread: null,
    loading: false,
    fetchError: null,
    createError: null,
    updateError: null,
    deleteError: null,
}

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchThread.pending, (state) => {
            state.loading = true;
            state.fetchError = null;
        })
        .addCase(fetchThread.fulfilled, (state, action) => {
            state.loading = false;
            state.thread = action.payload;
        })
        .addCase(fetchThread.rejected, (state, action) => {
            state.loading = false;
            state.fetchError = action.payload as string;
        })
        .addCase(createThread.pending, (state) => {
            state.loading = true;
            state.createError = null;
        })
        .addCase(createThread.fulfilled, (state, action) => {
            state.loading = false;
            state.thread = action.payload;
            state.createError = null;
        })
        .addCase(createThread.rejected, (state, action) => {
            state.loading = false;
            state.createError = action.payload as string;
        })
        .addCase(updateThread.pending, (state) => {
            state.loading = true;
            state.updateError = null;
        })
        .addCase(updateThread.fulfilled, (state, action) => {
            state.loading = false;
            state.thread = action.payload;
            state.updateError = null;
        })
        .addCase(updateThread.rejected, (state, action) => {
            state.loading = false;
            state.updateError = action.payload as string;
        })
        .addCase(deleteThread.pending, (state) => {
            state.loading = true;
            state.deleteError = null;
        })
        .addCase(deleteThread.fulfilled, (state, action) => {
            state.thread = action.payload;
            state.loading = false;
            state.deleteError = null;
        })
        .addCase(deleteThread.rejected, (state, action) => {
            state.loading = false;
            state.deleteError = action.payload as string;
        })
    }
});

export const fetchThread = createAsyncThunk(
    "thread/fetchThread",
    async (threadId: string, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadId}`);

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
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
            return thunkAPI.rejectWithValue(errorResponse.error);
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
      return thunkAPI.rejectWithValue(errorResponse.error);
    }

    const data = await response.json();
    return data;
  }
);

export const deleteThread = createAsyncThunk(
    'thread/deleteThread',
    async (threadId: string, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
    
        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
    );

export default threadSlice.reducer;