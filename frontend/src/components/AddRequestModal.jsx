import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AddRequest } from "../features/requestSlice"
import { getAppointments } from "../features/appointmentSlice"

// eslint-disable-next-line react/prop-types
function AddRequestModal({ showAddModal, setShowAddModal }) {
    const dispatch = useDispatch()
    const [appointmentId, setAppointmentId] = useState("")
    const appointments = useSelector((state) => state.appointment.appointments)
    const handleAddRequest = () => {
        dispatch(AddRequest(appointmentId))
        setShowAddModal(false)
        setAppointmentId("")
    }

    useEffect(() => {
        if (appointments.length === 0) {
            dispatch(getAppointments())
        }
    }, [dispatch, appointments])
    return (
        <div
            className={showAddModal ? "overflow-y-auto overflow-x-hidden fixed right-0 top-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" : "hidden"}
        >
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-center flex-col p-2">
                        <div className="mb-6">
                            <label htmlFor="appointments" className="block text-sm font-medium text-white mb-1"> Bus </label>
                            <select
                                name="appointments"
                                id="appointments"
                                onChange={(e) => setAppointmentId(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option hidden value="">Please select</option>
                                {appointments.map((appointment) => (
                                    appointment.capacity > appointment.booked && <option className="text-white bg-gray-600" value={appointment.id} key={appointment.id}>
                                        {appointment.destinationName}
                                        {" - "} 
                                        {new Date(appointment.dateTime).toLocaleDateString()} {new Date(appointment.dateTime).toLocaleTimeString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="p-6 space-x-2">
                        <button
                            type="button"
                            onClick={handleAddRequest}
                            className="btn btn-success text-center"
                        >
                            Add Request
                        </button>
                        <button
                            onClick={() => setShowAddModal(false)}
                            type="button"
                            className="btn btn-secondary text-center"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddRequestModal