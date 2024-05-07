import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBusesApi, deleteBusApi, createBusApi, editBusApi } from "../apis/busApi";


export const getBuses = createAsyncThunk("buses/getBuses", async () => {
    const response = getBusesApi();
    return response;
});

export const createBus = createAsyncThunk("buses/createBus", async (bus) => {
    const response = createBusApi(bus);
    return response;
})

export const deleteBus = createAsyncThunk("buses/deleteBus", async (busId) => {
    const response = deleteBusApi(busId);
    return response;
})

export const editBus = createAsyncThunk("buses/editBus", async ({ busId, busDestination }) => {
    const response = editBusApi(busId, busDestination);
    return response;
})


const initialState = {
    buses: [],
    error: null,
    successAdded: false,
    successEdited: false
}


export const busSlice = createSlice({
    name: "buses",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getBuses.fulfilled, (state, action) => {
                state.buses = action.payload;
            })
            .addCase(getBuses.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(createBus.fulfilled, (state, action) => {
                state.successAdded = true;
                state.buses = action.payload;
            })
            .addCase(createBus.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteBus.fulfilled, (state, action) => {
                state.buses = action.payload;
            })
            .addCase(deleteBus.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(editBus.pending, (state) => {
                state.successEdited = false;
            })
            .addCase(editBus.fulfilled, (state, action) => {
                state.successEdited = true;
                state.buses = action.payload;
            })
            .addCase(editBus.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})


export default busSlice.reducer