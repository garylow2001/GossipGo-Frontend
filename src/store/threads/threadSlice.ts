import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { createThreadLike, deleteThreadLike } from './threadLikeSlice';

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
    likes: ThreadLike[];
    likes_count: number;
}

export interface ThreadLike {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    user_id: number;
    thread_id: number;
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
        builder.addCase(fetchThread.fulfilled, (state, action) => {
            state.thread = action.payload;
        })
            .addCase(fetchThread.rejected, (state, action) => {
                state.fetchError = action.payload as string;
            })
            .addCase(createThread.fulfilled, (state, action) => {
                state.thread = action.payload;
            })
            .addCase(createThread.rejected, (state, action) => {
                state.createError = action.payload as string;
            })
            .addCase(updateThread.fulfilled, (state, action) => {
                state.thread = action.payload;
            })
            .addCase(updateThread.rejected, (state, action) => {
                state.updateError = action.payload as string;
            })
            .addCase(deleteThread.fulfilled, (state, action) => {
                state.thread = action.payload;
            })
            .addCase(deleteThread.rejected, (state, action) => {
                state.deleteError = action.payload as string;
            })
            .addCase(createThreadLike.fulfilled, (state, action) => {
                if (state.thread) {
                    state.thread.likes.push(action.payload.data);
                }
            })
            .addCase(deleteThreadLike.fulfilled, (state, action) => {
                if (state.thread) {
                    state.thread.likes = state.thread.likes.filter((like) => like.ID !== action.payload.data.ID);
                }
            })
            .addMatcher((action) => isPending(action) && action.type.startsWith('thread/'),
                (state) => {
                    state.loading = true;
                    state.createError = null;
                    state.updateError = null;
                    state.deleteError = null;
                }
            )
            .addMatcher((action) => isFulfilled(action) && action.type.startsWith('thread/'),
                (state) => {
                    state.loading = false;
                    state.createError = null;
                    state.updateError = null;
                    state.deleteError = null;
                }
            )
            .addMatcher((action) => isRejected(action) && action.type.startsWith('thread/'),
                (state) => {
                    state.loading = false;
                }
            );
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