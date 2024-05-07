import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AppointmentsTable from "../components/AppointmentsTable"
import { getAppointments } from "../features/appointmentSlice"
import AddAppointmentModal from "../components/AddAppointmentModal"

function Appointments() {
    const dispatch = useDispatch()
    const role = useSelector((state) => state.account.role)
    const [showAddModal, setShowAddModal] = useState(false)
    useEffect(() => {
        dispatch(getAppointments())
    }, [dispatch])
    return (
        <>
            <h1 className="text-center font-bold text-[2rem] mb-6">Appointments</h1>
            <button onClick={() => setShowAddModal(true)} type="button" className={role && role.toLowerCase() === "traveler" ? "hidden" : "btn btn-primary text-right mb-3"}>Add Appointment</button>
            <div className="relative overflow-x-auto">
                <AppointmentsTable />
            </div>
            <AddAppointmentModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
        </>
    )
}


export default Appointments