import axiosInstance from "./axiosInstance";


export const getRequestsApi = async () => {
    const role = localStorage.getItem('role')
    try {
        if (role.toLowerCase() === "traveler") {
            const userId = localStorage.getItem('userId')
            const response = await axiosInstance.get(`/api/AppointmentRequests/${userId}`)
            return response.data
        } else {
            const response = await axiosInstance.get('/api/AppointmentRequests')
            return response.data
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteRequestApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/AppointmentRequests/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const editRequestApi = async (id, status) => {
    try {
        const response = await axiosInstance.put(`/api/AppointmentRequests/${id}?status=${status}`,)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const addRequestApi = async (appointmentId) => {
    try {
        const userId = localStorage.getItem('userId')
        const response = await axiosInstance.post(`/api/AppointmentRequests?id=${userId}&appointmentId=${appointmentId}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}