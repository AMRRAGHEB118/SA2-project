import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointments } from "../features/appointmentSlice";

function AppointmentsTable() {
    const appointments = useSelector((state) => state.appointment.appointments)
    const dispatch = useDispatch()
    const role = useSelector((state) => state.account.role)

    const handleEditAppointments = (id) => {
        // dispatch(editAppointments(id))
        console.log(id);
    }

    const handleDeleteAppointments = (id) => {
        dispatch(deleteAppointments(id))
    }

    const tableRows = useMemo(() => {
        if (!appointments) {
            return <tr className="loading loading-spinner loading-xs">
            </tr>;
        } else {
            // eslint-disable-next-line react/prop-types
            return appointments.map((appointment) => (
                <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {appointment.id}
                    </th>
                    <td className="px-6 py-4">
                        {appointment.destinationName}
                    </td>
                    <td className="px-6 py-4">
                        {new Date(appointment.dateTime).toLocaleDateString()} {new Date(appointment.dateTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                        {appointment.capacity}
                    </td>
                    <td className="px-6 py-4">
                        {appointment.booked}
                    </td>
                    <td scope="col" className={role && role.toLowerCase() === "traveler" ? "hidden" : "px-6 py-4"}>
                        <button
                            onClick={() => handleEditAppointments(appointment.id)}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Edit
                        </button>
                    </td>
                    <td scope="col" className={role && role.toLowerCase() === "traveler" ? "hidden" : "px-6 py-4"}>
                        <button
                            onClick={() => handleDeleteAppointments(appointment.id)}
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appointments, dispatch]);
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Destination
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date and Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Capacity
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Booked
                    </th>
                    <th scope="col" className={role && role.toLowerCase() === "traveler" ? "hidden" : "px-6 py-3"}>
                        Edit
                    </th>
                    <th scope="col" className={role && role.toLowerCase() === "traveler" ? "hidden" : "px-6 py-3"}>
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}


export default AppointmentsTable