import axiosInstance from "./axiosInstance";


export const getBusesApi = async () => {
    try {
        const response = await axiosInstance.get('/api/BusDestinations')
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createBusApi = async (bus) => {
    try {
        const response = await axiosInstance.post(`/api/BusDestinations?destination=${bus}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteBusApi = async (busId) => {
    try {
        const response = await axiosInstance.delete(`/api/BusDestinations/${busId}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const editBusApi = async (busId, busDestination) => {
    try {
        const response = await axiosInstance.put(`/api/BusDestinations/${busId}?destination=${busDestination}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}