// authSlice.js - Redux slice for authentication
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type AuthState = {
    user: null | User,
    isAuthenticated: boolean,
    token: null | string,
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; cookie: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.cookie; // Set the token upon user login
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null; // Clear the token upon user logout
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
