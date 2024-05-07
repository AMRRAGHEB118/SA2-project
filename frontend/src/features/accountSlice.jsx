import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../apis/accountApi";
import decodeJWT from "../utils/decodeToken";
import getRole from "../utils/getRole";
import getUserId from "../utils/getUserId";

export const login = createAsyncThunk("account/login", async ({ email, password }) => {
    const response = await loginApi(email, password);
    return response;
})

const initialState = {
    account: JSON.parse(localStorage.getItem("account")) || null,
    role: localStorage.getItem("role") || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    success: false,
    userId: localStorage.getItem("userId") || null
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.account = null;
            state.token = null;
            state.role = null;
            state.userId = null;
            localStorage.removeItem("account");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
            window.location.reload();
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                let tokenPayload = decodeJWT(action.payload.token);
                state.account = tokenPayload;
                state.role = getRole(tokenPayload);
                state.userId = getUserId(tokenPayload);
                localStorage.setItem("role", state.role);
                localStorage.setItem("userId", state.userId);
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("account", JSON.stringify(state.account));
                state.success = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.account = null;
                localStorage.removeItem("account");
            })
    }
});

export const { logout, clearError } = accountSlice.actions;
export default accountSlice.reducer;