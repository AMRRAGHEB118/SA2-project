import BusTable from "../components/BusTable"
import AddBusModal from "../components/AddBusModal"
import { useDispatch, useSelector } from "react-redux"
import { getBuses } from "../features/busSlice"
import { useEffect, useState } from "react"
import EditBusModal from "../components/EditBusModal"

function BusDestination () {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedBusId, setSelectedBusId] = useState(null)
    const buses = useSelector((state) => state.bus.buses)
    useEffect(() => {
        dispatch(getBuses())
    }, [dispatch])
    return (
        <>
            <h1 className="text-center font-bold text-[2rem] mb-6">Bus Destination</h1>
            <button onClick={() => setShowModal(true)} type="button" className="btn btn-primary text-right mb-3">Add Bus</button>
            <div className="relative overflow-x-auto">
                <BusTable buses={buses} setShowEditModal={setShowEditModal} setSelectedBusId={setSelectedBusId}/>
            </div>
            <AddBusModal showModal={showModal} setShowModal={setShowModal} />
            <EditBusModal showEditModal={showEditModal} setShowEditModal={setShowEditModal} selectedBusId={selectedBusId} />
        </>
    )
}   


export default BusDestination