import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddRequestModal from "../components/AddRequestModal"
import RequestsTable from "../components/RequestsTable"
import { getRequests } from "../features/requestSlice"

function Requests () {
    const dispatch = useDispatch()
    const [showAddModal, setShowAddModal] = useState(false)
    const role = useSelector((state) => state.account.role)
    useEffect(() => {
        dispatch(getRequests())
    }, [dispatch, role])

    return (
        <>
            <h1 className="text-center font-bold text-[2rem] mb-6">{role && role.toLowerCase() === "admin" ? "All Requests" : "My Requests"}</h1>
            <button onClick={() => setShowAddModal(true)} type="button" className={role && role.toLowerCase() === "admin" ? "hidden" : "btn btn-primary text-right mb-3"}>Add Request</button>
            <div className="relative overflow-x-auto">
                <RequestsTable />
            </div>
            <AddRequestModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
        </>
    )
}


export default Requests