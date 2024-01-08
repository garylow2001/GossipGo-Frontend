import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Comment {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    body: string;
    author_id: number;
    author: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        username: string;
    };
    thread_id: number;
    comment_id: number;
}

interface CommentState {
    comment: Comment | null;
    loading: boolean;
    addError: string | null;
    updateError: string | null;
    removeError: string | null;
}

const initialState: CommentState = {
    comment: null,
    loading: false,
    addError: null,
    updateError: null,
    removeError: null,
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
            state.addError = null;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.comment = action.payload;
            state.loading = false;
            state.addError = null;
        })
        .addCase(addComment.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.addError = action.payload as string;
        })
        .addCase(updateComment.pending, (state) => {
            state.loading = true;
            state.updateError = null;
        })
        .addCase(updateComment.fulfilled, (state, action) => {
            state.comment = action.payload;
            state.loading = false;
            state.updateError = null;
        })
        .addCase(updateComment.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.updateError = action.payload as string;
        })
        .addCase(removeComment.pending, (state) => {
            state.loading = true;
            state.removeError = null;
        })
        .addCase(removeComment.fulfilled, (state, action) => {
            state.comment = action.payload;
            state.loading = false;
            state.removeError = null;
        })
        .addCase(removeComment.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.removeError = action.payload as string;
        })
    }
});

export const addComment = createAsyncThunk(
    'comment/addComment',
    async ({ id, text }: { id: string, text: string }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { body: text } ),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
);

export const updateComment = createAsyncThunk(
    'comment/updateComment',
    async ({ threadID, commentID , text }: { threadID: string, commentID: string, text: string }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadID}/comments/${commentID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { body: text } ),
            credentials: 'include',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
);

export const removeComment = createAsyncThunk(
    'comment/removeComment',
    async ({ threadID, commentID }: { threadID: string, commentID: string }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadID}/comments/${commentID}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
);

export default commentSlice.reducer;
