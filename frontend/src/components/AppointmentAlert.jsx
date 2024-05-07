import { useEffect, useState } from "react"

// eslint-disable-next-line react/prop-types
function AppointmentAlert({ error }) {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (error) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 5000);
        } else {
            setShow(false)
        }
    }, [error])
    return (
        // must be place in a corner of the screen
        <div hidden={!show} role="alert" className="sticky mt-4 w-72 z-50 left-2 bottom-2 rounded border-s-4 border-red-500 bg-red-50 p-4">
            <strong className="block font-medium text-red-800"> Error Appointment </strong>
            <p className="mt-2 text-sm text-red-700">
                {error}
            </p>
        </div>
    )
}


export default AppointmentAlert