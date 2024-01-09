import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../auth/authSlice";

export interface User {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    username: string;
}

interface UserState {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.user;
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
            state.currentUser = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.currentUser = null;
        });
    },
});

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, thunkAPI) => {
        const response = await fetch("http://localhost:3000/validate", {
            method: "GET",
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

export default userSlice.reducer;