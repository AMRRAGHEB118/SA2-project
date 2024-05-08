import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsers, deleteUser } from "../features/userSlice"


function UsersTable () {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users)
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
        setTimeout(() => {
            dispatch(getUsers())
        }, 300)
    }

    const handleEditUser = (id) => {
        // dispatch(editUser(id))
        console.log(id);
    }

    const tableRows = useMemo(() => {
        if (!users) {
            return <tr><span className="loading loading-spinner loading-xs"></span>
            </tr>;
        } else {
            // eslint-disable-next-line react/prop-types
            return users.map((user) => (
                <tr key={user.Id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {user.userName}
                    </th>
                    <td className="px-6 py-4">
                        {user.Email}
                    </td>
                    <td className="px-6 py-4">
                        {user.PhoneNumber}
                    </td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => handleEditUser(user.Id)}
                            type="button"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            Edit
                        </button>
                    </td>
                    <td className="px-6 py-4">
                        <button
                            onClick={() => handleDeleteUser(user.Id)}
                            type="button"
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        }
    }, [handleDeleteUser, users])
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                    userName
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Phone
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
    )
}


export default UsersTable