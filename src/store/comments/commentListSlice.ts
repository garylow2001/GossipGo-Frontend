import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment, addComment, removeComment } from "./commentSlice";

export interface CommentList extends Array<Comment> {}

interface CommentListState {
    comments: CommentList;
    loading: boolean;
    error: string | null;
}

const initialState: CommentListState = {
    comments: [],
    loading: false,
    error: null,
};

const commentListSlice = createSlice({
    name: 'commentList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchComments.rejected, (state, action) => {
            console.log(action);
            state.comments = [];
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.comments.push(action.payload);
            state.loading = false;
            state.error = null;
        })
        .addCase(removeComment.fulfilled, (state, action) => {
            // state.comments = state.comments.filter((comment) => comment.ID !== action.payload);
            // CHANGE the above
            state.loading = true;
            state.error = null;
        });
    }
});

export const fetchComments = createAsyncThunk(
    'comment/fetchComments',
    async (id: string, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${id}/comments`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.message);
        }

        const result = await response.json();
        return result;
    }
);

export default commentListSlice.reducer;