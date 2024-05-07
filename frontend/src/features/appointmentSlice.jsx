import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAppointmentApi, deleteAppointmentsApi, getAppointmentsApi } from "../apis/appointmentApi";


export const getAppointments = createAsyncThunk("appointments/getAppointments", async () => {
    const response = await getAppointmentsApi();
    return response;
})

export const addAppointment = createAsyncThunk("appointments/addAppointment", async ({ busId, formattedDateTime, capacity }) => {
    const response = await addAppointmentApi({ busId, formattedDateTime, capacity });
    return response;
})

export const deleteAppointments = createAsyncThunk("appointments/deleteAppointments", async (id) => {
    const response = await deleteAppointmentsApi(id);
    return response;
})

const initialState = {
    appointments: [],
    error: null,
    successAdd: false,
}

export const appointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
            })
            .addCase(getAppointments.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(addAppointment.fulfilled, (state, action) => {
                state.appointments = action.payload;
                state.successAdd = true;
            })
            .addCase(addAppointment.rejected, (state, action) => {
                state.error = action.error.message;
                state.successAdd = false;
            })
            .addCase(deleteAppointments.fulfilled, (state, action) => {
                state.appointments = action.payload;
            })
            .addCase(deleteAppointments.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})


export default appointmentSlice.reducer