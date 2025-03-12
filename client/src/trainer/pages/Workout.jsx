import { Icon } from "@iconify/react";
import { Form } from "@nextui-org/form";
import {
    Button,
    Card, CardBody,
    CardFooter,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from "sonner";
import Loader from '../../components/Loader';
import { NextButton } from '../../components/NextButton';
import { deleteWorkout, getWorkoutData, saveWorkout } from '../../services/trainerServices/Workout';


function Workout() {

    const [videoFile, setVideoFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [workout, setWorkout] = useState([]);
    const [selectedWorkoutId, setSlectedWorkoutId] = useState('')
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const [action, setAction] = useState(null);
    const [action, setAction] = React.useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [trainer, setTrainer] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [getData, setGetData] = useState('')

    useEffect(() => {
        document.title = 'Workout | Fitness360'
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const trainerId = decodedToken.id;
            setTrainer(trainerId)
            getWorkout(trainerId, currentPage)
        }
    }, [currentPage, getData]);

    const handleEdit = (data) => {
        console.log('edit', data)
    }

    const handleDelete = (data) => {
        setSlectedWorkoutId(data)
        setDeleteConfirm(true)
        console.log(deleteConfirm)
    }

    const deleteCofirm = async () => {
        setDeleteConfirm(false)
        try {
            const result = await deleteWorkout(selectedWorkoutId)
            if (result.statusCode === 200) {
                toast.success(result.message)
                const closeBtn = document.getElementById('closeVideo')
                if (closeBtn) {
                    closeBtn.click()
                }
            } else if (result.statusCode === 204) {
                toast.error(result.message)
            } else if (result.statusCode === 203) {
                toast.success(result.message)
            }
            setGetData('2')
        } catch (error) {
            console.log(error)
        } finally {
            getWorkout(trainerId, currentPage)
        }
    }

    const deleteCancel = async () => {
        setDeleteConfirm(false)
        toast.info('Data is safe')
    }

    const getWorkout = async (trainerId, page = 1, pageSize = 9) => {
        try {
            setLoading(true)
            const result = await getWorkoutData(trainerId, page, pageSize)
            setWorkout(result.workoutData.workoutData)
            setTotalPages(result.workoutData.totalPages)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    const workoutDetails = (data) => {
        setSelectedWorkout(data);
    }

    const handleFormSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Append additional data
        formData.append("trainerId", trainer);
        if (videoFile) formData.append("video", videoFile);
        if (imageFile) formData.append("image", imageFile);
        if (selectedCategory) formData.append("category", selectedCategory);

        // Validation for title
        const title = formData.get("title");
        if (!title || title.trim() === "") {
            toast.error("Workout title is required");
            return;
        } else if (title.trim().length < 3) {
            toast.error("Workout title must be at least 3 characters long");
            return;
        }

        // Validation for description
        const description = formData.get("description");
        if (!description || description.trim() === "") {
            toast.error("Workout description is required");
            return;
        } else if (description.trim().length < 10) {
            toast.error("Workout description must be at least 10 characters long");
            return;
        }

        // Validation for image file
        if (!imageFile) {
            toast.error("Workout image is required");
            return;
        } else if (!imageFile.type.startsWith("image/")) {
            toast.error("Invalid file type for image. Please upload a valid image.");
            return;
        } else if (imageFile.size > 5 * 1024 * 1024) {
            toast.error("Image file size must not exceed 5MB.");
            return;
        }

        // Validation for video file
        if (!videoFile) {
            toast.error("Workout video is required");
            return;
        } else if (!videoFile.type.startsWith("video/")) {
            toast.error("Invalid file type for video. Please upload a valid video.");
            return;
        } else if (videoFile.size > 50 * 1024 * 1024) {
            toast.error("Video file size must not exceed 50MB.");
            return;
        }
        if (!selectedCategory || selectedCategory.trim() === "") {
            toast.error("Please select a category");
            return;
        }

        try {
            setLoading(true)
            // console.log("-----API HITTED-----");
            const response = await saveWorkout(formData);
            // console.log("response", response);
            if (response.statusCode === 200) {
                toast.success(response.message);
                const closeBtn = document.getElementById("closeBtn");
                if (closeBtn) {
                    closeBtn.click();
                }
            } else if (response.statusCode === 204) {
                toast.error(response.message || "No Content");
            } else if (response.statusCode === 203) {
                toast.error(response.message || "Invalid Data");
            } else {
                toast.error("Unexpected error occurred.");
            }

            // Trigger data refresh
            setGetData("1");
        } catch (error) {
            console.error("Error saving workout:", error.response?.data || error.message);
            toast.error(
                error.response?.data?.message ||
                "An error occurred while saving the workout. Please try again."
            );
            setAction("Failed to save workout.");
        } finally {
            setLoading(false)
        }
    };


    const handleCategoryChange = (value) => {
        console.log('Selected category:', value.target.value);
        setSelectedCategory(value.target.value);
    };
    const categoryList = [
        {
            key: "cardio",
            label: "Cardio",
        },
        {
            key: "core",
            label: "Core Exercise",
        },
        {
            key: "cross_Fit",
            label: "Cross Fit",
        },
        {
            key: "abs",
            label: "Abs",
        },
        {
            key: 'buildmuscle',
            label: 'Build Muscle'
        },
        {
            key: 'upperbody',
            label: 'Upper Body'
        },
        {
            key: 'aerobics',
            label: 'Aerobics'
        },
        {
            key: 'lowerbody',
            label: 'Lower Body'
        },
    ];
    return (
        <>
            <Toaster className="z-50" richColors position="top-right" />
            <section>
                <div className='flex justify-between mb-4'>
                    <div className='text-xl font-semibold'>Workout List</div>
                    <NextButton color='secondary' className='border-1 dark:border-light/50 dark:bg-background dark:text-light bg-light border-background/50 text-background ' onPress={onOpen}>Add Workout</NextButton>
                </div>

                <div className={`z-100 absolute z-50 rounded-2xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-svh w-svw ${loading === true ? "" : "hidden"}`}>
                    <Loader />
                </div>



                <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(450px,1fr))] ">

                    {workout.map((data, index) => (

                        <Card key={index} isPressable shadow="sm" onPress={() => workoutDetails(data)}>

                            <CardBody className="overflow-visible p-0">
                                {data?.price != 0 &&
                                    <Tooltip content='Premium' color='success'>
                                        <Icon
                                            aria-label='Premium'
                                            className=" text-2xl text-default-400 absolute z-40 right-[1px] top-[1px] h-8 w-8 p-1 shadow-inner bg-gradient-to-bl from-light to-secondlight rounded-xl"
                                            icon="solar:crown-bold"
                                            color="green"
                                        />
                                    </Tooltip>
                                }
                                <Image
                                    alt={data.title}
                                    className="w-full object-cover h-[240px]"
                                    radius="lg"
                                    shadow="sm"
                                    src={data.imagePath}
                                    width="100%"
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b>{data.title}</b>
                            </CardFooter>
                        </Card>
                    ))
                    }

                </div>
                <div className="m-2 border-none rounded-xl flex justify-end items-center w-fit-conte fixed right-4 bottom-4 z-10">
                    <div className="border-1 dark:border-secondlight border-background rounded-lg p-[1px] flex justify-center">
                        <NextButton
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            color="secondary"
                            className="w-32 dark:bg-light dark:text-background"
                        >
                            Previous
                        </NextButton>
                        <span className="mx-[2px] border-1 border-background dark:border-light rounded-lg px-2 pt-[6px]">
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
            </section >

            {/* add workout  */}
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add A new Workout</ModalHeader>
                            <Toaster className="z-50" richColors position="top-right" />

                            <ModalBody>
                                <Form
                                    className="w-full flex flex-col gap-4"
                                    validationBehavior="native"
                                    onReset={() => setAction("Form reset.")}
                                    onSubmit={handleFormSubmit}
                                >
                                    <Input
                                        isRequired
                                        errorMessage="Please enter a workout title"
                                        label="Workout Title"
                                        labelPlacement="outside"
                                        name="title"
                                        placeholder="Enter the workout title"
                                        type="text"
                                    />

                                    <Textarea
                                        isRequired
                                        label="Workout Description"
                                        labelPlacement="outside"
                                        name="description"
                                        placeholder="Enter a description"
                                    />
                                    <Input
                                        label="Price"
                                        labelPlacement='outside'
                                        name='price'
                                        placeholder='Enter Price'
                                        type='number'
                                    />
                                    <Input
                                        isRequired
                                        label="Workout Image"
                                        labelPlacement="outside"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImageFile(e.target.files[0])}
                                    />
                                    <Input
                                        isRequired
                                        label="Workout Video"
                                        labelPlacement="outside"
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                    />
                                    <Select
                                        radius="none"
                                        classNames={{
                                            base: "mb-[2px] h-[52px] rounded-lg dark:border-red-500",
                                            inputWraper: "rounded-lg "
                                        }}
                                        variant="flat"
                                        items={categoryList}
                                        label="Category"
                                        placeholder="Select Category"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        {(item) => (
                                            <SelectItem key={item.value} value={item.value} className='rounded-lg' variant='flat'>
                                                {item.label}
                                            </SelectItem>
                                        )}
                                    </Select>

                                    <div className="flex gap-2">
                                        <Button color="primary" type="submit">
                                            Submit
                                        </Button>
                                        <Button type="reset" variant="flat">
                                            Reset
                                        </Button>
                                        <Button id='closeBtn' onPress={onClose} className='hidden'>
                                            close
                                        </Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Modal for displaying workout details */}
            {
                selectedWorkout && (
                    <Modal size="5xl" isOpen={Boolean(selectedWorkout)} onOpenChange={() => setSelectedWorkout(null)} className='w-[90%]'>
                        <ModalContent>
                            <Toaster className="z-50" richColors position="top-right" />

                            <ModalHeader>{selectedWorkout.title}</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 justify-between text-sm bg-secondlight/40 py-1 px-2 rounded-md'>
                                        <p><strong>Date Created:</strong> {new Date(selectedWorkout.dateCreated).toLocaleDateString()}</p>
                                        <p><strong>Time Created:</strong> {new Date(selectedWorkout.dateCreated).toLocaleTimeString()}</p>
                                    </div>
                                    <div className='bg-secondlight/40 py-1 px-2  rounded-md flex'>
                                        <p className='w-10/12'><strong>Description:</strong> {selectedWorkout.description}</p>
                                        <p className='w-2/12'>Price: {selectedWorkout.price}</p>
                                    </div>
                                </div>
                                <video src={selectedWorkout.videoPath} controls></video>
                            </ModalBody>
                            <ModalFooter className='flex justify-between'>
                                <div className='flex gap-2'>
                                    <NextButton className="border-1 bg-sky-200 border-sky-600 text-background rounded h-9 px-[14px] text-center" onClick={() => handleEdit(selectedWorkout._id)}>
                                        Edit
                                    </NextButton>
                                    <NextButton className="border-1 bg-red-200 border-red-500 text-background rounded rounded-br-lg h-9 px-[14px] text-center" onClick={() => handleDelete(selectedWorkout._id)}>
                                        Delete
                                    </NextButton>
                                </div>
                                {deleteConfirm &&
                                    <div className='h-screen w-screen bg-secondary/50  fixed top-0 left-0 flex items-center justify-center '>
                                        <div className=' bg-light p-2 rounded-md'>
                                            <div className='text-center text-xl font-semibold mb-2 dark:text-background'> Want to Delete?</div>
                                            <div className='flex justify-between gap-24'>
                                                <NextButton className="border-1 bg-green-200 border-green-600 text-background rounded h-9 px-[14px] text-center" onClick={deleteCancel}>
                                                    No, Don't Delete
                                                </NextButton>
                                                <NextButton className="border-1 bg-red-200 border-red-500 text-background rounded rounded-br-lg h-9 px-[14px] text-center" onClick={deleteCofirm} >
                                                    Yes, Delete
                                                </NextButton>

                                            </div>
                                        </div>
                                    </div>
                                }
                                <Button color="danger" variant="light" onPress={() => setSelectedWorkout(null)} id='closeVideo'>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal >
                )
            }
        </>
    )
}

export default Workout