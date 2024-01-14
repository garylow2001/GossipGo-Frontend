import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

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
    likes: CommentLike[];
}

export interface CommentLike {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    user_id: number;
    comment_id: number;
}

interface CommentState {
    comment: Comment | null;
    loading: boolean;
    createError: string | null;
    updateError: string | null;
    deleteError: string | null;
}

const initialState: CommentState = {
    comment: null,
    loading: false,
    createError: null,
    updateError: null,
    deleteError: null,
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comment = action.payload;
        })
            .addCase(addComment.rejected, (state, action) => {
                state.createError = action.payload as string;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.comment = action.payload;
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.updateError = action.payload as string;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comment = action.payload;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.deleteError = action.payload as string;
            })
            .addMatcher((action) => isPending(action) && action.type.startsWith('comment/'),
                (state) => {
                    state.loading = true;
                    state.createError = null;
                    state.updateError = null;
                    state.deleteError = null;
                }
            )
            .addMatcher((action) => isFulfilled(action) && action.type.startsWith('comment/'),
                (state) => {
                    state.loading = false;
                    state.createError = null;
                    state.updateError = null;
                    state.deleteError = null;
                }
            )
            .addMatcher((action) => isRejected(action) && action.type.startsWith('comment/'),
                (state) => {
                    state.loading = false;
                }
            );
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
            body: JSON.stringify({ body: text }),
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
    async ({ threadID, commentID, text }: { threadID: string, commentID: string, text: string }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadID}/comments/${commentID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body: text }),
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

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async ({ threadID, commentID }: { threadID: string, commentID: string }, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${threadID}/comments/${commentID}`, {
            method: 'DELETE',
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

export default commentSlice.reducer;
