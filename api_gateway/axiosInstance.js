const axios = require('axios')

const axiosBusDestinationInstance = axios.create({
    baseURL: 'http://destination_service_container:5001',
    headers: {
        'Content-Type': 'application/json'
    }
})

const axiosUserInstance = axios.create({
    baseURL: 'http://user_service_container:5229',
    headers: {
        'Content-Type': 'application/json'
    }
})


module.exports = {
    axiosBusDestinationInstance,
    axiosUserInstance
}