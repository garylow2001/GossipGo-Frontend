import { PayloadAction, createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { Comment, addComment, deleteComment, updateComment } from "./commentSlice";
import { createCommentLike, deleteCommentLike } from "./commentLikeSlice";

export interface CommentList extends Array<Comment> { }

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
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.loading = false;
            state.error = null;
        })
            .addCase(fetchComments.rejected, (state, action) => {
                state.comments = [];
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.comments = state.comments.map((comment) =>
                    comment.ID === action.payload.ID ? action.payload : comment
                );
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const deletedCommentID = action.payload.ID;
                state.comments = state.comments.filter((comment: Comment) => comment.ID !== deletedCommentID);
            })
            .addCase(createCommentLike.fulfilled, (state, action) => {
                console.log(action.payload);
                const updatedCommentID = action.payload.commentID;
                const comment = state.comments.find(comment => comment.comment_id === updatedCommentID);
                if (comment) {
                    comment.likes = action.payload.data;
                }
            })
            .addCase(deleteCommentLike.fulfilled, (state, action) => {
                console.log(action.payload);
                const updatedCommentID = action.payload.commentID;
                const comment = state.comments.find(comment => comment.comment_id === updatedCommentID);
                if (comment) {
                    comment.likes = action.payload.data;
                }
            })
            .addMatcher((action) => isPending(action) && action.type.startsWith('commentList/'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher((action) => isFulfilled(action) && action.type.startsWith('commentList/'),
                (state) => {
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher((action) => isRejected(action) && action.type.startsWith('commentList/'),
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
});

export const fetchComments = createAsyncThunk(
    'commentList/fetchComments',
    async (id: string, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/threads/${id}/comments`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log(errorResponse);
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
);

export default commentListSlice.reducer;