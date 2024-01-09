import { PayloadAction, createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { Thread, createThread, deleteThread, updateThread } from "./threadSlice";

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
        .addCase(createThread.fulfilled, (state, action) => {
            state.threads.push(action.payload);
        })
        .addCase(updateThread.fulfilled, (state, action) => {
            const updatedThreadID = action.payload.ID;
            state.threads = state.threads.map((thread) => 
                thread.ID === updatedThreadID ? action.payload : thread
            );
        })
        .addCase(deleteThread.fulfilled, (state, action) => {
            const deletedThreadID = action.payload.ID;
            state.threads = state.threads.filter((thread:Thread) => thread.ID !== deletedThreadID);
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
    async (_, thunkAPI) => {
        const response = await fetch("http://localhost:3000/threads");
        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }
        
        const result = await response.json();
        return result;
    }
);

export default threadListSlice.reducer;