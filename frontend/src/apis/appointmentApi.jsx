import axiosInstance from "./axiosInstance";

export const getAppointmentsApi = async () => {
    try {
        const response = await axiosInstance.get('/api/Appointments')
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const addAppointmentApi = async ({ busId, formattedDateTime, capacity }) => {
    try {
        console.log("formattedDateTime", formattedDateTime);
        const response = await axiosInstance.post('/api/Appointments', { busDestinationId: busId, dateTime: formattedDateTime, capacity })
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteAppointmentsApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/Appointments/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}