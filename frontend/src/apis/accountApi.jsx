import axiosInstance from "./axiosInstance";

export const loginApi = async (email, password) => {
    try {
        const response = await axiosInstance.post('/api/Users/login', { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Invalid email or password");
    }
}