import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { deleteBus } from "../features/busSlice";

// eslint-disable-next-line react/prop-types
function BusTable({ buses, setShowEditModal, setSelectedBusId }) {
    const dispatch = useDispatch()
    const handleDeleteBus = (id) => {
        dispatch(deleteBus(id))
    }

    const handleEditBus = (id) => {
        setSelectedBusId(id)
        setShowEditModal(true)
    }

    const tableRows = useMemo(() => {
        if (!buses) {
            return <tr><span className="loading loading-spinner loading-xs"></span>
            </tr>;
        } else {
            // eslint-disable-next-line react/prop-types
            return buses.map((bus) => (
                <tr key={bus.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {bus.id}
                    </th>
                    <td className="px-6 py-4">
                        {bus.destinationName}
                    </td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => handleEditBus(bus.id)}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Edit
                        </button>
                    </td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => handleDeleteBus(bus.id)}
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
    }, [buses, dispatch]);

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Bus ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Bus Destination
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    );
}

export default BusTable;