import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

interface AuthState {
    loading: boolean;
    isLoggedIn: boolean;
    error: string | null;
    user: User | null;
}

const initialState: AuthState = {
    loading: false,
    isLoggedIn: false,
    error: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => { // login reducers
            state.loading = true;
            state.isLoggedIn = false;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.user = action.payload.user;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = action.payload as string;
        })
        .addCase(signup.pending, (state) => { // signup reducers
            state.loading = true;
            state.error = null;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
        })
        .addCase(signup.rejected, (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = action.payload as string;
        })
    },
});

export const login = createAsyncThunk(
    "auth/login",
    async (data: { username: string; password: string; }, thunkAPI) => {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            return thunkAPI.rejectWithValue(result.message);
        }

        return result;
    }
);

export const signup = createAsyncThunk(
    "auth/signup",
    async (data: { username: string; password: string; }, thunkAPI) => {
        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            return thunkAPI.rejectWithValue(result.message);
        }

        return result;
    }

);

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User; }; }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { token: String; }; }) => state.auth.token;