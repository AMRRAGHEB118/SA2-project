const { axiosUserInstance } = require("../axiosInstance");


exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const response = await axiosUserInstance.post('/api/Users/login', { email, password })
        console.log(response.data);
        res.status(201).json(response.data)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

exports.createUser = async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body
    try {
        const response = await axiosUserInstance.post('/api/Users/add', { userName, email, password, phoneNumber })
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.createAdmin = async (req, res) => {
    const { userName, email, password, phoneNumber } = req.body
    try {
        const response = await axiosUserInstance.post('/api/Users/addAdmin', { userName, email, password, phoneNumber })
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


exports.getUsers = async (req, res) => {
    try {
        const response = await axiosUserInstance.get('/api/Users')
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const response = await axiosUserInstance.delete(`/api/Users/${id}`)
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.editUser = async (req, res) => {
    const { id } = req.params
    const { userName, email, phoneNumber } = req.body
    try {
        const response = await axiosUserInstance.put(`/api/Users/${id}`, { userName, email, phoneNumber })
        res.status(201).json(response.data)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}