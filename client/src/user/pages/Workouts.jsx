import { Icon } from "@iconify/react";
import {
    Button, Card, CardBody, CardFooter, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Spinner,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "sonner";
import { NextButton } from "../../components/NextButton";
import { getWorkoutByCategoryData } from "../../services/adminService/Workout";
import { enrollWorkoutData } from "../../services/userServices/EnrollWorkout";
import { useApplicationUser } from "../../utils/ApplicationUserContext";

function Workouts() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [workout, setWorkout] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { isOpen: isOpenQuestion, onOpen: onOpenQuestion, onClose: onCloesQuestion, onOpenChange: onOpenChangeQuestion } = useDisclosure();
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const { appUserId } = useApplicationUser();
    const [pageSize, setPageSize] = useState(9);
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Workouts | Fitness360'
        const workoutValue = (sessionStorage.getItem('workoutValue'))
        if (workoutValue && workoutValue.length > 0) {
            sessionStorage.removeItem('workoutValue');
            getWorkoutByCategory(currentPage, pageSize, workoutValue)
        } else if (selectedCategory && selectedCategory.length > 0) {
            getWorkoutByCategory(currentPage, pageSize, selectedCategory)
        }
        else {
            getWorkoutByCategory(currentPage, pageSize, '')
        }
    }, [selectedCategory, currentPage])

    const categoryData = [
        {
            workOut: 'Cardio',
            workoutValue: 'cardio'
        },
        {
            workOut: 'Cross Fit',
            workoutValue: 'crossfit'
        },
        {
            workOut: 'Build Muscle',
            workoutValue: 'buildmuscle'
        },
        {
            workOut: 'Core Strength',
            workoutValue: 'corestrength'
        },
        {
            workOut: 'Abs Workout',
            workoutValue: 'abs'
        },
        {
            workOut: 'Upper Body',
            workoutValue: 'upperbody'
        },
        {
            workOut: 'Aerobics',
            workoutValue: 'aerobics'
        },
        {
            workOut: 'Lower Body',
            workoutValue: 'lowerbody'
        },
    ];

    const getWorkoutByCategory = async (page = 1, pageSize = 9, category) => {
        try {
            setLoading(true);
            const result = await getWorkoutByCategoryData(page, pageSize, category);
            setWorkout(result.workoutData.workoutData);
            setTotalPages(result.workoutData.totalPages);
            console.log('workout---', result.workoutData.workoutData)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const workoutDetails = (data) => {
        onOpenQuestion();
        setSelectedWorkout(data);
    }

    const cancelEnrollment = () => {
        onCloesQuestion()
        toast.info('You Missed Your Enrollment')
    }

    const handleEnrollment = async () => {
        onCloesQuestion()
        const enrollment = {
            userId: appUserId,
            workoutId: selectedWorkout._id,
            paymentStatus: 'paid',
        };
        await enrollWorkout(enrollment);
    }

    const enrollWorkout = async (enrollment) => {
        try {
            const result = await enrollWorkoutData(enrollment)
            if (result.enrollment.statusCode === 201) {
                toast.success(result.enrollment.message)
                navigate('/user/dashboard')
            } else if (result.enrollment.statusCode === 202) {
                toast.info(result.enrollment.message)
                navigate('/user/dashboard')
            } else if (result.enrollment.statusCode === 205) {
                toast.error(result.enrollment.message)
            }
        } catch (e) {
            console.log('error', e)
            toast.error('Unable to enroll')
        }
    }

    return (
        <>
            {loading === true &&
                <Spinner className="fixed top-1/2 left-1/2 z-50" isVisible={loading === true} size="xl" color="primary" />
            }
            <h2 className="font-semibold text-xl mb-2">Start you Workout</h2>
            <Dropdown>
                <DropdownTrigger>
                    <Button className="capitalize mb-8" variant="bordered">
                        {selectedCategory ? selectedCategory : 'Select Workout'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Select Workout"
                    selectedKeys={selectedCategory}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={setSelectedCategory}
                >
                    <DropdownItem textValue="All Workout" onClick={() => setSelectedCategory('')}>
                        All Workout
                    </DropdownItem>
                    {categoryData.map((category, index) => (
                        <DropdownItem key={index} textValue={category.workoutValue} onClick={() => setSelectedCategory(category.workoutValue)}>
                            {category.workOut}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {workout.length > 0 ?
                (loading ?
                    (<Spinner className="fixed top-1/2 left-1/2 z-50" isVisible={loading} size="xl" color="primary" />)
                    : (
                        <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(450px,1fr))]">
                            {workout.map((data, index) => (
                                <Card key={index} isPressable shadow="sm" onPress={() => workoutDetails(data)} className="hover:scale-[.98]">
                                    <CardBody className="overflow-visible p-0">
                                        {data?.price !== 0 && (
                                            <Tooltip content="Premium" color="success">
                                                <Icon
                                                    className="pointer-events-none text-2xl text-default-400 absolute z-40 right-[1px] top-[1px] h-8 w-8 p-1 shadow-inner bg-gradient-to-bl from-light to-secondlight rounded-xl"
                                                    icon="solar:crown-bold"
                                                    color="green"
                                                />
                                            </Tooltip>
                                        )}
                                        <Image
                                            alt={data.title}
                                            className="w-full object-cover h-[200px] bg-red-700"
                                            radius="lg"
                                            shadow="sm"
                                            src={data.imagePath}
                                            width="100%"
                                        />
                                    </CardBody>
                                    <CardFooter className="text-small justify-between">
                                        <b>{data.title}</b>
                                        <p className="font-thin text-xs">Category: <span className="capitalize text-sm font-normal">{data.category}</span></p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="flex justify-center h-full">
                        No Exercises for now under this category
                    </div>
                )}


            {/*paging button */}
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

            {/* want to enroll  */}
            <Modal isOpen={isOpenQuestion} onOpenChange={onOpenChangeQuestion} size="xs" backdrop="blur" className="dark:border dark:border-light/10">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Want to Enroll to this Workout?</ModalHeader>
                            <ModalBody >
                                <div className="flex gap-4 w-full justify-between mb-4">
                                    <NextButton className="w-1/2" onClick={cancelEnrollment}>No, dont Enroll</NextButton>
                                    <NextButton className="w-1/2" onClick={handleEnrollment}>Yes, Enroll</NextButton>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>


            <Toaster className="z-40" richColors position="top-right" />
        </>
    )
}

export default Workouts