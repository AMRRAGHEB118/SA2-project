import axiosInstance from "./axiosInstance";


export const getUsersApi = async () => {
    try {
        const response = await axiosInstance.get('/api/Users')
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const deleteUserApi = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/Users/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createUserApi = async (user) => {
    try {
        const response = await axiosInstance.post('/api/Users', user)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const editUserApi = async (id, user) => {
    try {
        const response = await axiosInstance.put(`/api/Users/${id}`, user)
        return response.data
    } catch (error) {
        throw new Error(error.message)
    }
}