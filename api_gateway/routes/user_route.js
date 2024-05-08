const { Router } = require('express')
const router = Router()
const { getUsers, createUser, loginUser, deleteUser, editUser, createAdmin } = require('../controllers/user_controller')

router.get('/', getUsers)
router.post('/add', createUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
router.put('/:id', editUser)
router.post('/addAdmin', createAdmin)


module.exports = router