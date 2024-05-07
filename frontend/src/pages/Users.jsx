import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import AddUserModal from "../components/AddUserModal"
import UsersTable from "../components/UsersTable"
import { getUsers } from "../features/userSlice"

function Users () {
    const dispatch = useDispatch()
    const [showAddModal, setShowAddModal] = useState(false)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    return (
        <>
            <h1 className="text-center font-bold text-[2rem] mb-6">Users</h1>
            <button onClick={() => setShowAddModal(true)} type="button" className="btn btn-primary text-right mb-3">Add User</button>
            <div className="relative overflow-x-auto">
                <UsersTable />
            </div>
            <AddUserModal showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
        </>
    )
}   


export default Users