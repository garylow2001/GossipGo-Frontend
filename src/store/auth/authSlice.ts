import { PayloadAction, createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { User, getCurrentUser } from "../user/userSlice";

interface AuthState {
    loading: boolean;
    isLoggedIn: boolean;
    loginError: string | null;
    signupError: string | null;
}

const initialState: AuthState = {
    loading: false,
    isLoggedIn: false,
    loginError: null,
    signupError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoggedIn = false;
        })
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.loginError = action.payload as string;
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupError = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(getCurrentUser.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
            .addMatcher((action) => isPending(action) && action.type.startsWith('auth/'),
                (state) => {
                    state.loading = true;
                    state.loginError = null;
                    state.signupError = null;
                }
            )
            .addMatcher((action) => isFulfilled(action) && action.type.startsWith('auth/'),
                (state) => {
                    state.loading = false;
                    state.loginError = null;
                    state.signupError = null;
                }
            )
            .addMatcher((action) => isRejected(action) && action.type.startsWith('auth/'),
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                }
            );
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

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        const response = await fetch("http://localhost:3000/users/logout", {
            method: "POST",
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

        if (!response.ok) {
            const errorResponse = await response.json();
            return thunkAPI.rejectWithValue(errorResponse.error);
        }

        const result = await response.json();
        return result;
    }

);

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: User; }; }) => state.auth.user;
export const selectCurrentToken = (state: { auth: { token: String; }; }) => state.auth.token;