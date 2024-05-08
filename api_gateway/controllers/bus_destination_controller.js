const { axiosBusDestinationInstance } = require("../axiosInstance");


exports.createBusDestination = async (req, res) => {
    const { destination } = req.query
    try {
        const response = await axiosBusDestinationInstance.post(`/api/createDestination?destination=${destination}`);
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


exports.getDestinations = async (req, res) => {
    try {
        const response = await axiosBusDestinationInstance.get('/api/getDestinations')
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


exports.editBusDestination = async (req, res) => {
    const { id } = req.params
    const { destination } = req.query
    try {
        const response = await axiosBusDestinationInstance.put(`/api/updateDestination/${id}`, { destination })
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


exports.deleteBusDestination = async (req, res) => {
    const { id } = req.params
    try {
        const response = await axiosBusDestinationInstance.delete(`/api/deleteDestination/${id}`)
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}