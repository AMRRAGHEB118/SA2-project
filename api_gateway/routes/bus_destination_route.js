const { Router } = require('express')
const router = Router()

const { createBusDestination, getDestinations, editBusDestination, deleteBusDestination }
    = require('../controllers/bus_destination_controller')



router.get('/', getDestinations)
router.post('/', createBusDestination)
router.put('/:id', editBusDestination)
router.delete('/:id', deleteBusDestination)


module.exports = router