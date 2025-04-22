import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from "sonner";
import { fadeIn } from "../../assets/utils/motion";
import { NextButton } from "../../components/NextButton";
import { CreateTrainer, DeleteTrainer, getAllTrainers } from "../../services/adminService/TrainerService";
import { Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, Card, CardBody } from "@nextui-org/react";

function Trainers() {
    const [openForm, setOpenForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [selectedTrainer, setselectedTrainer] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [errors, setErrors] = useState({});

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

    const [colDefs] = useState([
        {
            headerName: 'Sr No',
            valueGetter: 'node.rowIndex + 1',
            width: 70,
            pinned: 'left'
        },
        { field: "firstName", headerName: "First Name" },
        { field: "lastName", headerName: "Last Name" },
        { field: "contactNumber", headerName: "Phone Number" },
        { field: "email", headerName: "Email" },
        { field: "age", headerName: "Age" },
        {
            field: "bio", headerName: "Bio",
            cellRenderer: (params) => (
                <div className="max-w-xs truncate">
                    {params.value}
                </div>
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
                    src={params.value}
                    alt="Profile"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
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
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onClick={() => handleEdit(params.data)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onClick={() => handleDelete(params.data)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ]);

    const genders = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ];

    useEffect(() => {
        document.title = 'Trainers | Fitness360';
        GetAllTrainers(currentPage);
    }, [currentPage]);

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!value) error = 'This field is required';
                break;
            case 'email':
                if (!value) error = 'Email is required';
                else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Invalid email format';
                break;
            case 'contactNumber':
                if (!value) error = 'Phone number is required';
                else if (!/^\d{10}$/.test(value)) error = 'Invalid phone number';
                break;
            case 'age':
            case 'totalClients':
                if (!value) error = 'This field is required';
                else if (isNaN(value)) error = 'Must be a number';
                break;
        }

        return error;
    };

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate field
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleEdit = (rowData) => {
        setEditData(rowData);
        setFormData(rowData);
        setOpenForm(true);
    };

    const handleDelete = (rowData) => {
        setselectedTrainer(rowData._id);
        setDeletePopUp(true);
    };

    const confirmDelete = async () => {
        if (selectedTrainer) {
            await deleteTrianer(selectedTrainer);
            setDeletePopUp(false);
            setselectedTrainer(null);
        }
    };

    const deleteTrianer = async (id) => {
        try {
            setLoading(true);
            await DeleteTrainer(id);
            toast.success("Trainer Deleted Successfully");
            GetAllTrainers();
        } catch (error) {
            console.error("Error deleting trainer:", error);
            toast.error('Unable to delete trainer');
        } finally {
            setLoading(false);
        }
    };

    const GetAllTrainers = async (page = 1, pageSize = 5) => {
        try {
            setLoading(true);
            const result = await getAllTrainers(page, pageSize);
            setRowData(result.trainers);
            setTotalPages(result.totalPages);
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
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
        setEditData(null);
    };

    const handleSubmit = async () => {
        // Validate form
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            setLoading(true);
            const result = await CreateTrainer(formData);
            toast.success('Trainer Created Successfully');
            resetForm();
            setOpenForm(false);
            GetAllTrainers();
        } catch (error) {
            console.error("Error creating trainer:", error);
            toast.error('Unable to Create Trainer');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTrainer = async () => {
        // Validate form
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            setLoading(true);
            const result = await CreateTrainer(formData);
            toast.success('Trainer Updated Successfully');
            resetForm();
            setOpenForm(false);
            GetAllTrainers();
        } catch (error) {
            console.error("Error updating trainer:", error);
            toast.error('Unable to Update Trainer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Delete Confirmation Modal */}
            <Modal isOpen={deletePopUp} onClose={() => setDeletePopUp(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Confirm Delete</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this trainer?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onPress={confirmDelete}>
                                    Delete
                                </Button>
                                <Button color="default" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Trainer Form Modal */}
            <Modal
                isOpen={openForm}
                onClose={toggleOpenForm}
                size="5xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {editData ? 'Edit Trainer' : 'Add New Trainer'}
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="First Name"
                                        value={formData.firstName}
                                        onValueChange={(value) => handleChange('firstName', value)}
                                        isRequired
                                        isInvalid={!!errors.firstName}
                                        errorMessage={errors.firstName}
                                    />
                                    <Input
                                        label="Last Name"
                                        value={formData.lastName}
                                        onValueChange={(value) => handleChange('lastName', value)}
                                        isRequired
                                        isInvalid={!!errors.lastName}
                                        errorMessage={errors.lastName}
                                    />
                                    <Input
                                        label="Email"
                                        value={formData.email}
                                        onValueChange={(value) => handleChange('email', value)}
                                        isRequired
                                        isInvalid={!!errors.email}
                                        errorMessage={errors.email}
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        value={formData.password}
                                        onValueChange={(value) => handleChange('password', value)}
                                        isRequired={!editData}
                                        isInvalid={!!errors.password}
                                        errorMessage={errors.password}
                                    />
                                    <Input
                                        label="Contact Number"
                                        value={formData.contactNumber}
                                        onValueChange={(value) => handleChange('contactNumber', value)}
                                        isRequired
                                        isInvalid={!!errors.contactNumber}
                                        errorMessage={errors.contactNumber}
                                    />
                                    <Select
                                        label="Gender"
                                        selectedKeys={[formData.gender]}
                                        onChange={(e) => handleChange('gender', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.gender}
                                        errorMessage={errors.gender}
                                    >
                                        {genders.map((gender) => (
                                            <SelectItem key={gender.value} value={gender.value}>
                                                {gender.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Input
                                        label="Age"
                                        type="number"
                                        value={formData.age}
                                        onValueChange={(value) => handleChange('age', value)}
                                        isRequired
                                        isInvalid={!!errors.age}
                                        errorMessage={errors.age}
                                    />
                                    <Input
                                        label="Total Clients"
                                        type="number"
                                        value={formData.totalClients}
                                        onValueChange={(value) => handleChange('totalClients', value)}
                                        isRequired
                                        isInvalid={!!errors.totalClients}
                                        errorMessage={errors.totalClients}
                                    />
                                    <Input
                                        label="Profile Picture URL"
                                        value={formData.profilePicture}
                                        onValueChange={(value) => handleChange('profilePicture', value)}
                                        isRequired
                                        isInvalid={!!errors.profilePicture}
                                        errorMessage={errors.profilePicture}
                                    />
                                    <Input
                                        label="Address"
                                        value={formData.address}
                                        onValueChange={(value) => handleChange('address', value)}
                                        isRequired
                                        isInvalid={!!errors.address}
                                        errorMessage={errors.address}
                                    />
                                    <Input
                                        label="City"
                                        value={formData.city}
                                        onValueChange={(value) => handleChange('city', value)}
                                        isRequired
                                        isInvalid={!!errors.city}
                                        errorMessage={errors.city}
                                    />
                                    <Input
                                        label="State"
                                        value={formData.state}
                                        onValueChange={(value) => handleChange('state', value)}
                                        isRequired
                                        isInvalid={!!errors.state}
                                        errorMessage={errors.state}
                                    />
                                    <Textarea
                                        label="Bio"
                                        value={formData.bio}
                                        onValueChange={(value) => handleChange('bio', value)}
                                        isRequired
                                        isInvalid={!!errors.bio}
                                        errorMessage={errors.bio}
                                    />
                                    <Input
                                        label="Instagram ID"
                                        value={formData.instaId}
                                        onValueChange={(value) => handleChange('instaId', value)}
                                        isRequired
                                        isInvalid={!!errors.instaId}
                                        errorMessage={errors.instaId}
                                    />
                                    <Input
                                        label="Facebook"
                                        value={formData.facebook}
                                        onValueChange={(value) => handleChange('facebook', value)}
                                        isRequired
                                        isInvalid={!!errors.facebook}
                                        errorMessage={errors.facebook}
                                    />
                                    <Input
                                        label="Twitter"
                                        value={formData.twitter}
                                        onValueChange={(value) => handleChange('twitter', value)}
                                        isRequired
                                        isInvalid={!!errors.twitter}
                                        errorMessage={errors.twitter}
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={editData ? handleUpdateTrainer : handleSubmit}
                                >
                                    {editData ? 'Update Trainer' : 'Add Trainer'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Spinner
                label="Loading..."
                color="success"
                className={`absolute rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-svh w-svw z-50 bg-light dark:bg-background ${loading ? "" : "hidden"}`}
            />

            <Toaster className="z-40" richColors position="top-right" />

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .2, 0.75)}
                className="flex justify-between items-center mb-8"
            >
                <h2 className="text-xl">Application Trainers List</h2>
                <Button
                    color="primary"
                    onClick={toggleOpenForm}
                    className={openForm ? 'hidden' : ''}
                >
                    Add Trainer
                </Button>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .4, 0.75)}
                className="ag-theme-quartz h-[80%]"
            >
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

export default Trainers;