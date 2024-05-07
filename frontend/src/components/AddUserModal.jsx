// eslint-disable-next-line react/prop-types
function AddUserModal ({ showAddModal, setShowAddModal }) {

    const handleAddUser = () => {
        setShowAddModal(false)
    }
    return (
        <div className={showAddModal ? "overflow-y-auto overflow-x-hidden fixed right-0 top-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" : "hidden"}>
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-5 bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-center p-2">
                    </div>
                    <div className="p-6 space-x-2">
                        <button
                            type="button"
                            onClick={handleAddUser}
                            className="btn btn-success text-center"
                        >
                            Add User
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


export default AddUserModal