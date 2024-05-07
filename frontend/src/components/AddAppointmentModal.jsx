import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBuses } from "../features/busSlice"
import Datepicker from "tailwind-datepicker-react"
import { addAppointment } from "../features/appointmentSlice"
import { DateTime } from "luxon"
const options = {
    title: "Select Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    minDate: new Date(),
    theme: {
        background: "bg-gray-700 dark:bg-gray-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "bg-red-300",
        input: "",
        inputIcon: "",
        selected: "bg-gray-200 dark:bg-gray-700",
    },
    icons: {
        prev: () => <span>Prev</span>,
        next: () => <span>Next</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}

// eslint-disable-next-line react/prop-types
function AddAppointmentModal({ showAddModal, setShowAddModal }) {
    const buses = useSelector((state) => state.bus.buses)
    const dispatch = useDispatch()
    const [busId, setBusId] = useState("")
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState("")
    const [capacity, setCapacity] = useState("")
    const [show, setShow] = useState(false)
    const successAdd = useSelector((state) => state.appointment.successAdd)
    const handleChange = (selectedDate) => {
        setDate(selectedDate)
    }
    const handleClose = (state) => {
        setShow(state)
    }

    useEffect(() => {
        dispatch(getBuses())
    }, [dispatch])

    useEffect(() => {
        if (successAdd) {
            setShowAddModal(false)
        }
    }, [successAdd, setShowAddModal])

    const handleAddAppointment = async () => {
        let combinedDateTime = new Date(date);
        const [hours, minutes] = time.split(":");
        combinedDateTime.setHours(hours);
        combinedDateTime.setMinutes(minutes);
        combinedDateTime = DateTime.fromJSDate(combinedDateTime, { zone: 'Africa/Cairo' });
        const formattedDateTime = combinedDateTime.toISO();
        console.log("formattedDateTime", formattedDateTime);
        console.log("combinedDateTime", combinedDateTime);


        // const options = { timeZone: 'Africa/Cairo' };
        // const formattedDateTime = combinedDateTime.toLocaleString('en-US', options);
        dispatch(addAppointment({ busId, formattedDateTime, capacity }));
    }

    return (
        <>
            <div
                className={showAddModal ? "overflow-y-auto overflow-x-hidden fixed right-0 top-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" : "hidden"}
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-center flex-col p-2">
                            <div className="mb-6">
                                <label htmlFor="buses" className="block text-sm font-medium text-white mb-1"> Bus </label>
                                <select
                                    name="buses"
                                    id="buses"
                                    onChange={(e) => setBusId(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option hidden value="">Please select</option>
                                    {buses.map((bus) => (
                                        <option className="text-white bg-gray-600" value={bus.id} key={bus.id}>
                                            {bus.destinationName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <label
                                htmlFor="capacity"
                                className="relative mb-6 block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                            >
                                <input
                                    type="number"
                                    id="capacity"
                                    placeholder="Capacity"
                                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                    min="10"
                                    max="50"
                                    onChange={(e) => setCapacity(e.target.value)}
                                    value={capacity}
                                />

                                <span
                                    className="absolute start-3 top-3 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
                                >
                                    Capacity
                                </span>
                            </label>
                            <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select time:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input value={time} onChange={(e) => setTime(e.target.value)} type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                        </div>
                        <div className="p-6 space-x-2">
                            <button
                                type="button"
                                onClick={handleAddAppointment}
                                className="btn btn-success text-center"
                            >
                                Add Appointment
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
        </>
    )
}


export default AddAppointmentModal