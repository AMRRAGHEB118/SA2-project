import { useDispatch, useSelector } from "react-redux"
import { createBus, getBuses } from "../features/busSlice"
import { useState, useEffect } from "react"


// eslint-disable-next-line react/prop-types
function AddBusModal({ showModal, setShowModal }) {
    const dispatch = useDispatch()
    const [busDestination, setBusDestination] = useState("")
    const successAdded = useSelector((state) => state.bus.successAdded)

    const handleAddBus = () => {
        dispatch(createBus(busDestination))
    }

    useEffect(() => {
        if (successAdded) {
            setShowModal(false)
            dispatch(getBuses())
        }
    }, [successAdded, setShowModal, dispatch])
    return (
        <div
            className={showModal ? "overflow-y-auto overflow-x-hidden fixed right-0 top-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" : "hidden"}
        >
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-center p-2">
                        <label
                            htmlFor="busDestination"
                            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        >
                            <input
                                type="text"
                                id="busDestination"
                                value={busDestination}
                                onChange={(e) => setBusDestination(e.target.value)}
                                className="h-10 w-56 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="Bus Destination"
                            />

                            <span
                                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                            >
                                Bus Destination
                            </span>
                        </label>
                    </div>
                    <div className="p-6 space-x-2">
                        <button
                            type="button"
                            onClick={handleAddBus}
                            className="btn btn-success text-center"
                        >
                            Add Bus
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
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


export default AddBusModal