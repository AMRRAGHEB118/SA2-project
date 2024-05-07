import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://api_gateway_service:5191',
    headers: {
        'Content-Type': 'application/json',
    },
})


export default axiosInstance