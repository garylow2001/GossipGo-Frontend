import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    thread: {
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        author: {
            ID: number;
            CreatedAt: string;
            UpdatedAt: string;
            DeletedAt: string | null;
        };
    };
    comment_id: number;
}

export interface CommentList extends Array<Comment> {}

interface CommentListState {
    comments: CommentList;
    loading: boolean;
    error: string | null;
}

const initialState: CommentListState = {
    comments: <CommentList>[],
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments: (state, action: PayloadAction<CommentList>) => {
            state.comments = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            console.log(action.payload);
            state.comments.push(action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(addComment.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(removeComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter((comment) => comment.ID !== action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(removeComment.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload as string;
        })
    }
});

export const addComment = createAsyncThunk(
    'comment/addComment',
    async ({ id, text }: { id: number, text: string }, thunkAPI) => {
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

export const removeComment = createAsyncThunk(
    'comment/removeComment',
    async (id: number, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/comments/${id}`, {
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

export const { setComments } = commentSlice.actions;

export default commentSlice.reducer;
