/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; import {
    AgGridReact
} from "ag-grid-react";
import {
    motion
} from 'framer-motion';
import {
    useEffect,
    useState
} from "react";
import {
    LazyLoadImage
} from 'react-lazy-load-image-component';
import {
    toast,
    Toaster
} from 'sonner';
import {
    fadeIn
} from "../../assets/utils/motion";
import {
    NextButton
} from "../../components/NextButton";
import {
    CreateUser,
    DeleteUser,
    getAllUsers,
    UpdateUser
} from '../../services/adminService/userService';
import {
    Spinner,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem,
    Card,
    CardBody,
    Divider
} from "@nextui-org/react";

function Users() {
    const [loading, setLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [editData, setEditData] = useState(null);
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [colDefs] = useState([
        {
            headerName: 'Sr No',
            valueGetter: 'node.rowIndex + 1',
            width: 70,
            pinned: 'left'
        },
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
            field: "profilePicture",
            headerName: "Profile Picture",
            cellRenderer: (params) => (
                <LazyLoadImage
                    src={params.value}
                    alt="Profile"
                    style={{ width: '38px', height: '38px', borderRadius: '50%' }}
                />
            ),
        },
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
    const [errors, setErrors] = useState({});

    const genders = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
    ];

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
        setEditData(null);
    };

    useEffect(() => {
        document.title = 'Users | Fitness360';
        fetchAllUsers(currentPage);
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
            case 'age':
            case 'height':
            case 'weight':
                if (!value) error = 'This field is required';
                else if (isNaN(value)) error = 'Must be a number';
                break;
            case 'contactNumber':
                if (!value) error = 'Phone number is required';
                else if (!/^\d{10}$/.test(value)) error = 'Invalid phone number';
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

    const handleUpdateUser = async () => {
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
            const result = await UpdateUser(formData);
            toast.success('User Updated Successfully');
            resetForm();
            setOpenForm(false);
            fetchAllUsers();
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error('Unable to Update User');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (rowData) => {
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

    const fetchAllUsers = async (page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            const result = await getAllUsers(page, pageSize);
            setRowData(result.users);
            setTotalPages(result.totalPages);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
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
            const result = await CreateUser(formData);
            toast.success('User Created Successfully');
            resetForm();
            setOpenForm(false);
            fetchAllUsers();
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error('Unable to Create User');
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

    return (
        <>
            {/* Delete Confirmation Modal */}
            <Modal isOpen={deletePopUp} onClose={() => setDeletePopUp(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Confirm Delete</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this user?</p>
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

            {/* User Form Modal */}
            <Modal
                isOpen={openForm}
                onClose={toggleOpenForm}
                size="2xl"
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {editData ? 'Edit User' : 'Add New User'}
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
                                        label="Height (cm)"
                                        type="number"
                                        value={formData.height}
                                        onValueChange={(value) => handleChange('height', value)}
                                        isRequired
                                        isInvalid={!!errors.height}
                                        errorMessage={errors.height}
                                    />
                                    <Input
                                        label="Weight (kg)"
                                        type="number"
                                        value={formData.weight}
                                        onValueChange={(value) => handleChange('weight', value)}
                                        isRequired
                                        isInvalid={!!errors.weight}
                                        errorMessage={errors.weight}
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
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={editData ? handleUpdateUser : handleSubmit}
                                >
                                    {editData ? 'Update User' : 'Add User'}
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

            <Toaster className="z-40" richColors position="top-right" closeButton />

            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeIn('', 'spring', .2, 0.75)}
                className="flex justify-between items-center mb-8"
            >
                <h2 className="text-xl">Application Users List</h2>
                <Button
                    color="primary"
                    onClick={toggleOpenForm}
                    className={openForm ? 'hidden' : ''}
                >
                    Add User
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

export default Users;