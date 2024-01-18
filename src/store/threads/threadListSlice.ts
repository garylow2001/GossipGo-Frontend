import { PayloadAction, createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { Thread, createThread, deleteThread, updateThread } from "./threadSlice";
import { createThreadLike, deleteThreadLike } from "./threadLikeSlice";
import { convertToSlug, threadCategories } from "../../utils/utils";

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
        builder.addCase(fetchThreadList.fulfilled, (state, action) => {
            state.threads = action.payload;
        })
            .addCase(fetchThreadList.rejected, (state) => {
                state.threads = [];
            })
            .addCase(createThread.fulfilled, (state, action) => {
                state.threads.unshift(action.payload);
            })
            .addCase(updateThread.fulfilled, (state, action) => {
                const updatedThreadID = action.payload.ID;
                state.threads = state.threads.map((thread) =>
                    thread.ID === updatedThreadID ? action.payload : thread
                );
            })
            .addCase(deleteThread.fulfilled, (state, action) => {
                const deletedThreadID = action.payload.ID;
                state.threads = state.threads.filter((thread: Thread) => thread.ID !== deletedThreadID);
            })
            .addCase(createThreadLike.fulfilled, (state, action) => {
                const updatedThreadID = action.payload.threadId;
                const thread = state.threads.find(thread => thread.ID === updatedThreadID);
                if (thread) {
                    if (!thread.likes) {
                        thread.likes = [];
                    }
                    thread.likes.push(action.payload.data);
                    thread.likes_count = thread.likes.length;
                }
            })
            .addCase(deleteThreadLike.fulfilled, (state, action) => {
                const updatedThreadID = action.payload.threadId;
                const thread = state.threads.find(thread => thread.ID === updatedThreadID);
                if (thread) {
                    thread.likes = thread.likes.filter((like) => like.ID !== action.payload.data.ID);
                    thread.likes_count = thread.likes.length;
                }
            })
            .addMatcher((action) => isPending(action) && action.type.startsWith('threadList/'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher((action) => isFulfilled(action) && action.type.startsWith('threadList/'),
                (state) => {
                    state.loading = false;
                    state.error = null;
                }
            )
            .addMatcher((action) => isRejected(action) && action.type.startsWith('threadList/'),
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const fetchThreadList = createAsyncThunk(
    "threadList/fetchThreadList",
    async ({ option }: { option?: string } = {}, thunkAPI) => {
        let url;
        if (!option) {
            url = "http://localhost:3000/threads";
        } else if (option === "recent") {
            url = "http://localhost:3000/threads/recent";
        } else if (option === "popular") {
            url = "http://localhost:3000/threads/popular";
        } else if (threadCategories.includes(option)) {
            url = "http://localhost:3000/threads/category/" + convertToSlug(option);
        } else {
            url = "http://localhost:3000/threads";
        }
        const response = await fetch(url);
        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
);

export default threadListSlice.reducer;