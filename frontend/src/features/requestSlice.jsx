/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequestsApi, deleteRequestApi, editRequestApi, addRequestApi } from "../apis/requestApi";


export const getRequests = createAsyncThunk("requests/getRequests", async () => {
    const response = await getRequestsApi();
    return response;
})

export const deleteRequest = createAsyncThunk("requests/deleteRequest", async (id) => {
    const response = await deleteRequestApi(id);
    return response;
})

export const editRequest = createAsyncThunk("requests/editRequest", async ({ id, status }) => {
    const response = await editRequestApi(id, status);
    return response;
})

export const AddRequest = createAsyncThunk("requests/AddRequest", async (appointmentId) => {
    const response = await addRequestApi(appointmentId);
    return response;
})


const initialState = {
    requests: [],
    error: null
};

export const requestSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRequests.fulfilled, (state, action) => {
                state.requests = action.payload
            })
            .addCase(getRequests.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.requests = action.payload
            })
            .addCase(deleteRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(editRequest.fulfilled, (state, action) => {
                state.requests = action.payload
            })
            .addCase(editRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(AddRequest.fulfilled, (state, action) => {
                state.requests = action.payload
            })
            .addCase(AddRequest.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})


export default requestSlice.reducer