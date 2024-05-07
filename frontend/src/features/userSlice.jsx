import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersApi, deleteUserApi } from "../apis/userApi";


export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const response = await getUsersApi();
    return response;
})

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
    const response = await deleteUserApi(id);
    return response;
})


const initialState = {
    users: [],
    error: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})


export default userSlice.reducer