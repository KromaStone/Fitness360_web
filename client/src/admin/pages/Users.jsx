/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from 'sonner';
import { fadeIn } from "../../assets/utils/motion";
import MyForm from '../../components/Form';
import { NextButton } from "../../components/NextButton";
import { CreateUser, DeleteUser, getAllUsers, UpdateUser } from '../../services/adminService/userService';
import { Spinner } from "@nextui-org/react";
const imgBaseUrl = '';

function Users() {
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // user id
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [colDefs, setColDefs] = useState([
        { field: "firstName", headerName: "First Name" },
        { field: "lastName", headerName: "Last Name" },
        { field: "age", headerName: "Age" },
        { field: "email", headerName: "Email" },
        { field: "contactNumber", headerName: "Phone Number" },
        { field: "gender", headerName: "Gender" },
        { field: "height", headerName: "Height" },
        { field: "weight", headerName: "Weight" },
        { field: "address", headerName: "Address" },
        { field: "city", headerName: "City" },
        { field: "state", headerName: "State" },
        {
            field: "profilePicture", headerName: "Profile Picture",
            cellRenderer: (params) => (
                <LazyLoadImage
                    src={imgBaseUrl + params.value}
                    alt="Profile"
                    style={{ width: '38px', height: '38px', borderRadius: '50%' }}
                />
            ),
        },
        {
            field: "actionButtons",
            headerName: "Actions",
            cellRenderer: (params) => (
                <div>
                    <button className="bg-cyan-400 mx-1 rounded h-9 px-[14px] text-center" onClick={() => handleEdit(params.data)}>
                        Edit
                    </button>
                    <button className="bg-red-400 mx-1 rounded h-9 px-[14px] text-center" onClick={() => handleDelete(params.data)}>
                        Delete
                    </button>
                </div>
            ),
        },
    ]);

    const initialFormData = {
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        password: '',
        contactNumber: '',
        gender: '',
        height: '',
        weight: '',
        address: '',
        city: '',
        state: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const resetForm = () => {
        setFormData(initialFormData);
        setEditData(null);
    };

    useEffect(() => {
        document.title = 'Users | Fitness360'
        fetchAllUsers(currentPage);
    }, [currentPage]);

    const handleEdit = (rowData) => {
        setEditData(rowData);
        setFormData(rowData);
        setOpenForm(true);
    };

    const handleUpdateUser = async (formData) => {
        try {
            setLoading(true);
            const result = await UpdateUser(formData);
            toast.success('User Updated Successfully')
        } catch (error) {
            console.error("Error Updating user:", error);
            toast.error('Unable to Update User')
        } finally {
            resetForm();
            setOpenForm(false);
            setLoading(false);
            fetchAllUsers();
        }
    };

    const handleDelete = async (rowData) => {
        setSelectedUser(rowData._id);
        setDeletePopUp(true);
    };

    const confirmDelete = async () => {
        if (selectedUser) {
            await deleteUser(selectedUser);
            setDeletePopUp(false);
            setSelectedUser(null);
        }
    };

    const cancelDelete = () => {
        setDeletePopUp(false);
        toast.info('User not deleted');
    };

    const deleteUser = async (id) => {
        try {
            setLoading(true);
            await DeleteUser(id);
            fetchAllUsers();
            toast.success('User Deleted Successfully');
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error('Unable to delete user');
        } finally {
            setLoading(false);
        }
    };

    // change the pagesize to change get no of records
    const fetchAllUsers = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const result = await getAllUsers(page, pageSize)
            setRowData(result.users)
            setTotalPages(result.totalPages)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { label: 'First Name', name: 'firstName', type: 'text', required: true },
        { label: 'Last Name', name: 'lastName', type: 'text', required: true },
        { label: 'Age', name: 'age', type: 'number', required: true },
        { label: 'Email', name: 'email', type: 'email', required: true },
        { label: 'Password', name: 'password', type: 'text', required: true },
        { label: 'Contact Number', name: 'contactNumber', type: 'number', required: true },
        { label: 'Gender', name: 'gender', type: 'text', required: true },
        { label: 'Height', name: 'height', type: 'number', required: true },
        { label: 'Weight', name: 'weight', type: 'number', required: true },
        { label: 'Address', name: 'address', type: 'text', required: true },
        { label: 'City', name: 'city', type: 'text', required: true },
        { label: 'State', name: 'state', type: 'text', required: true }
    ];

    const handleSubmit = async (formData) => {
        console.log('formdata :  '.formData)
        try {
            setLoading(true);
            const result = await CreateUser(formData);
            console.log('result :  ', result)
            if (result.statusCode === 201) toast.success(result.message);
            if (result.statusCode === 400) toast.error(result.message);
            if (result.statusCode === 404) toast.error(result.message);
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error('Unable to Create user ')
        } finally {
            resetForm();
            setOpenForm(false);
            setLoading(false);
            fetchAllUsers();
        }
    };

    const toggleOpenForm = () => {
        setOpenForm(!openForm);
        if (openForm) {
            resetForm();
        }
    }


    return (
        <>
            {/* delete pop-up */}
            {deletePopUp && (
                <div className="flex  justify-center z-30 absolute inset-0 h-24 top-6">
                    <div className="bg-white p-3 rounded-lg shadow-2xl  border-[1px]">
                        <p>Do you want to delete this user?</p>
                        <div className="mt-2 flex justify-around w-full">
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded mr-2 w-2/5"
                                onClick={confirmDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 px-2 py-1 rounded w-2/5"
                                onClick={cancelDelete}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Spinner label="Loading..." color="success" className={`absolute rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-svh w-svw z-50 bg-light dark:bg-background ${loading === true ? "" : "hidden"}`} />

            <Toaster className="z-40" richColors position="top-right" />

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .2, 0.75)} className="flex justify-between items-center mb-8">
                <h2 className="text-xl">Application Users List</h2>
                <button type="submit" className={`transition ease-in-out duration-300 bg-background px-4 py-2 rounded-lg border text-white hover:bg-white hover:text-black hover:border hover:border-black ${openForm === true ? 'hidden' : ''}`} onClick={toggleOpenForm}>Add User</button>
            </motion.div>

            <div className={`z-40 transition ease-in-out duration-900 w-6/12 border-2 shadow-lg border-black bg-white p-8 rounded-3xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${openForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="flex justify-between mb-4">
                    <p className="text-xl">  {editData ? 'Edit User' : 'Add New User'}</p>
                    <button type="submit" className='transition ease-in-out duration-300 bg-background px-4 py-2 rounded-lg border text-white hover:bg-white hover:text-black hover:border hover:border-black' onClick={toggleOpenForm}>Close</button>
                </div>
                <MyForm fields={fields} onSubmit={editData ? handleUpdateUser : handleSubmit} initialValues={formData} />
            </div>

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .4, 0.75)} className="ag-theme-quartz h-[80%]"            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
                <div className="m-2 border-none rounded-xl flex justify-end items-center w-fit-conte">
                    <div className="border-1 dark:border-secondlight border-background rounded-lg p-[1px] flex justify-center">
                        <NextButton
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            color="secondary"
                            className="w-32 dark:bg-light dark:text-background"
                        >
                            Previous
                        </NextButton>
                        <span className="mx-[2px] border-1 border-background dark:border-light rounded-lg px-2 pt-[8px] text-background dark:text-light">
                            Page {currentPage} of {totalPages}
                        </span>
                        <NextButton
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            color="secondary"
                            className="w-32 dark:bg-light dark:text-background"
                        >
                            Next
                        </NextButton>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Users;