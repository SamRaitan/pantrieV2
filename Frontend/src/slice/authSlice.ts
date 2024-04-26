// authSlice.js - Redux slice for authentication
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
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
