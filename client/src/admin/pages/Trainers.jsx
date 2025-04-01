/* eslint-disable no-unused-vars */
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from "sonner";
import { fadeIn } from "../../assets/utils/motion";
import MyForm from '../../components/Form';
import Loader from "../../components/Loader";
import { NextButton } from "../../components/NextButton";
import { CreateTrainer, DeleteTrainer, getAllTrainers } from "../../services/adminService/TrainerService";
import { Spinner } from "@nextui-org/react";
const imgBaseUrl = '';
function Trainers() {

    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [selectedTrainer, setselectedTrainer] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [colDefs, setColDefs] = useState([
        { field: "firstName", headerName: "First Name" },
        { field: "lastName", headerName: "Last Name" },
        { field: "contactNumber", headerName: "Phone Number" },
        { field: "email", headerName: "Email" },
        { field: "age", headerName: "Age" },
        {
            field: "bio", headerName: "Bio",
            cellRenderer: (params) => (
                <select className="absolute left-0 top-0 h-full p-1 bg-transparent">
                    <option value={params.value} className="p-4">
                        {params.value}
                    </option>
                </select>
            )
        },
        { field: "certifications", headerName: "Certifications" },
        { field: "city", headerName: "City" },
        { field: "location", headerName: "Location" },
        { field: "totalClients", headerName: "Total Clients" },
        {
            field: "profilePicture", headerName: "Profile Picture",
            cellRenderer: (params) => (
                <LazyLoadImage
                    src={imgBaseUrl + params.value}
                    alt="Profile"
                    style={{ width: '50px', borderRadius: '50%' }}
                />
            ),
        },
        { field: "instaId", headerName: "Insta ID" },
        { field: "facebook", headerName: "Facebook" },
        { field: "twitter", headerName: "Twitter" },
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


    const fields = [
        { label: 'First Name', name: 'firstName', type: 'text', required: true },
        { label: 'Last Name', name: 'lastName', type: 'text', required: true },
        { label: 'Email', name: 'email', type: 'email', required: true },
        { label: 'Password', name: 'password', type: 'password', required: true },
        { label: 'Age', name: 'age', type: 'number', required: true },
        { label: 'Contact Number', name: 'contactNumber', type: 'number', required: true },
        { label: 'Profile Picture', name: 'profilePicture', type: 'text', required: true },
        { label: 'Gender', name: 'gender', type: 'text', required: true },
        { label: 'Address', name: 'address', type: 'text', required: true },
        { label: 'City', name: 'city', type: 'text', required: true },
        { label: 'State', name: 'state', type: 'text', required: true },
        { label: 'Bio', name: 'bio', type: 'text', required: true },
        { label: 'Total Clients', name: 'totalClients', type: 'text', required: true },
        { label: 'Instagram ID', name: 'instaId', type: 'text', required: true },
        { label: 'Facebook', name: 'facebook', type: 'text', required: true },
        { label: 'Twitter', name: 'twitter', type: 'text', required: true }
    ]


    useEffect(() => {
        document.title = 'Trainers | Fitness360'
        GetAllTrainers(currentPage); // Fetch the first page initially
    }, [currentPage]);

    const initialFormData = {
        firstName: '',
        lastName: '',
        role: 'trainer',
        email: '',
        password: '',
        age: '',
        contactNumber: '',
        profilePicture: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        bio: '',
        totalClients: '',
        instaId: '',
        facebook: '',
        twitter: '',
    };

    const [formData, setFormData] = useState(initialFormData);


    const handleEdit = () => {
        alert('edit')
    }

    const handleDelete = (rowData) => {
        setselectedTrainer(rowData._id);
        setDeletePopUp(true);
    }

    const cancelDelete = () => {
        setDeletePopUp(false);
        toast.info("User not deleted")
    }

    const confirmDelete = async () => {
        if (selectedTrainer) {
            await deleteTrianer(selectedTrainer);
            setDeletePopUp(false);
            selectedTrainer(null)
        }
    }

    const deleteTrianer = async (id) => {
        try {
            setLoading(true);
            const result = await DeleteTrainer(id);
            toast.success("Trainer Delete Successfully")
            GetAllTrainers();

        } catch (error) {
            console.error("Error deleting trainer:", error);
            toast.error('Unable to delete trainer');
        } finally {
            setLoading(false);
        }

    }

    // change the pagesize to change get no of records
    const GetAllTrainers = async (page = 1, pageSize = 5) => {
        try {
            // setLoading(true);
            const result = await getAllTrainers(page, pageSize);
            setRowData(result.trainers);
            setTotalPages(result.totalPages);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching trainers:", error);
        } finally {
            setLoading(false);
        }
    };


    const toggleOpenForm = () => {
        setOpenForm(!openForm);
        if (openForm) {
            resetForm();
        }
    }

    const resetForm = () => {
        setFormData(initialFormData);
        setEditData(null);
    };

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            console.log('formData', formData)
            const result = await CreateTrainer(formData);
            console.log('result', result)
            if (result.data.statusCode === 201) toast.success(result.data.message);
            if (result.data.statusCode === 400) toast.error(result.data.message);
            if (result.data.statusCode === 404) toast.error(result.data.message);
        } catch (error) {
            console.error("Error creating Trainer:", error);
            toast.error('Unable to Create Trainer')
        } finally {
            resetForm();
            setOpenForm(false);
            setLoading(false);
            GetAllTrainers();
        }
    }

    const handleUpdateTrainer = async (formData) => {

    }


    return (
        <>
            {deletePopUp && (
                <div className="flex  justify-center z-30 absolute inset-0 h-24 top-6">
                    <div className="bg-white p-3 rounded-lg shadow-2xl border-[1px]">
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

            <Spinner label="Loading..." color="success" className={`z-50 bg-light dark:bg-background w-screen h-screen ${loading === true ? "" : "hidden"}`} />
            <Toaster className="z-40" richColors position="top-right" />
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .2, 0.75)} className="flex justify-between h-10 mb-8">
                <h2 className="text-2xl">Application Trainers List</h2>
                <button type="submit" className={`transition ease-in-out duration-300 bg-background px-4 py-2 rounded-lg border text-white hover:bg-white hover:text-black hover:border hover:border-black ${openForm === true ? 'hidden' : ''}`} onClick={toggleOpenForm}>Add Trainer</button>
            </motion.div>
            <div className={`z-40 transition ease-in-out duration-900 w-6/12 border-2 shadow-lg border-black bg-white p-8 rounded-3xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${openForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <div className="flex justify-between mb-4">
                    <p className="text-xl">  {editData ? 'Edit Trainer' : 'Add New Trainer'}</p>
                    <button type="submit" className='transition ease-in-out duration-300 bg-background px-4 py-2 rounded-lg border text-white hover:bg-white hover:text-black hover:border hover:border-black' onClick={toggleOpenForm}>Close</button>
                </div>
                <MyForm fields={fields} onSubmit={editData ? handleUpdateTrainer : handleSubmit} initialValues={formData} />
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
                        <span className="mx-[2px] border-1 border-background dark:border-light rounded-lg px-2 pt-[8px]  text-background dark:text-light">
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
    )
}

export default Trainers