import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRequest } from "../features/requestSlice";

function RequestsTable() {
    const requests = useSelector((state) => state.request.requests)
    const dispatch = useDispatch()
    const role = useSelector((state) => state.account.role)

    const handleEditRequest = (id, status) => {
        dispatch(editRequest({ id, status }));
    }



    const tableRows = useMemo(() => {
        if (requests.length === 0) {
            return <tr className="loading loading-spinner loading-xs mx-auto my-10"></tr>;
        } else {
            // eslint-disable-next-line react/prop-types
            return requests.map((request) => (
                <tr key={request.requestId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {request.requestId}
                    </th>
                    <td className="px-6 py-4">
                        {request.travelerName}
                    </td>
                    <td className="px-6 py-4">
                        {request.destinationName}
                    </td>
                    <td className="px-6 py-4">
                        {new Date(request.dateTime).toLocaleDateString()} {new Date(request.dateTime).toLocaleTimeString()}
                    </td>
                    <td className={`px-6 py-4 ${request.requestStatus.toLowerCase() === "pending" ? "text-yellow-500" : request.requestStatus.toLowerCase() === "approved" ? "text-green-500" : "text-red-500"}`}>
                        {request.requestStatus}
                    </td>
                    <td className={role.toLowerCase() === "admin" ? "px-6 py-4" : "hidden"}>
                        <button
                        disabled={request.requestStatus.toLowerCase() !== "pending"}
                            type="button"
                            className="btn btn-success text-center"
                            onClick={() => dispatch(handleEditRequest(request.requestId, "approved"))}
                        >
                            Approve
                        </button>
                    </td>
                    <td className={role.toLowerCase() === "admin" ? "px-6 py-4" : "hidden"}>
                        <button
                        disabled={request.requestStatus.toLowerCase() !== "pending"}
                            onClick={() => dispatch(handleEditRequest(request.requestId, "rejected"))}
                            type="button"
                            className="btn btn-danger text-center"
                        >
                            Reject
                        </button>
                    </td>
                </tr>
            ));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requests, dispatch]);
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Request Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Traveler Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Destination
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date and Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Request Status
                    </th>
                    <th scope="col" className={role.toLowerCase() === "admin" ? "px-6 py-3" : "hidden"}>
                        Approve
                    </th>
                    <th scope="col" className={role.toLowerCase() === "admin" ? "px-6 py-3" : "hidden"}>
                        Reject
                    </th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}


export default RequestsTable