import React, { useState } from 'react'
import { fadeIn } from '../../assets/utils/motion'
import { motion } from 'framer-motion'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Tooltip,
    useDisclosure
} from "@nextui-org/react";
import { toast, Toaster } from 'sonner';

function ClassSchedule() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedClassTime, setSelectedClassTime] = useState(null);
    const [selectedClassDay, setSelectedClassDay] = useState(null);


    const scheduleData = [
        {
            time: "06:00 - 07:00",
            Monday: { class: "HIIT BLAST", instructor: "Alex Morgan" },
            Tuesday: { class: "KICKBOXING", instructor: "Liam Smith" },
            Wednesday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Thursday: { class: "STRONGMAN TRAINING", instructor: "Eva Green" },
            Friday: { class: "SPIN CLASS", instructor: "Noah Johnson" },
            Saturday: null,
            Sunday: null,
        },
        {
            time: "07:00 - 08:00",
            Monday: { class: "ZUMBA FITNESS", instructor: "Olivia Brown" },
            Tuesday: { class: "TABATA WORKOUT", instructor: "Ethan Davis" },
            Wednesday: { class: "PILATES SESSION", instructor: "Sophia Lee" },
            Thursday: { class: "MMA TRAINING", instructor: "Lucas Martinez" },
            Friday: { class: "JUMP ROPE CIRCUIT", instructor: "Ava Wilson" },
            Saturday: null,
            Sunday: null,
        },
        {
            time: "08:00 - 09:00",
            Monday: { class: "CARDIO KICK", instructor: "Mason Taylor" },
            Tuesday: { class: "BARRE WORKOUT", instructor: "Isabella Harris" },
            Wednesday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Thursday: { class: "TRX SUSPENSION", instructor: "James Clark" },
            Friday: { class: "PUNCHING BAG DRILLS", instructor: "Grace Lewis" },
            Saturday: null,
            Sunday: null,
        },
        {
            time: "09:00 - 10:00",
            Monday: { class: "STRENGTH CIRCUIT", instructor: "Benjamin Hall" },
            Tuesday: { class: "CARDIO BLAST", instructor: "Emily Young" },
            Wednesday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Thursday: { class: "YOGA FLOW", instructor: "Daniel King" },
            Friday: null,
            Saturday: null,
            Sunday: null,
        },
        {
            time: "10:00 - 11:00",
            Monday: { class: "FLEXIBILITY SESSION", instructor: "Charlotte Scott" },
            Tuesday: { class: "CROSS TRAINING", instructor: "Henry Adams" },
            Wednesday: { class: "DANCE FITNESS", instructor: "Amelia Baker" },
            Thursday: null,
            Friday: null,
            Saturday: null,
            Sunday: null,
        },
    ];


    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleClassClick = (classData, time, day) => {
        console.log('-------', day)
        if (classData) {
            setSelectedClass(classData);
            setSelectedClassTime(time)
            setSelectedClassDay(day)
            onOpen();
        }
    };

    return (
        <section className="py-8 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 xl:px-52 bg-light text-background dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4 relative overflow-hidden w-full">
            <div className='w-full max-w-[1550px] m-auto'>
                <motion.p
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.3, 0.5)}
                    className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-primary uppercase font-semibold">
                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block font-semibold"></span>Our class <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                </motion.p>
                <motion.h2
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.2, 0.5)}
                    className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize mb-2 lg:mb-8">
                    Training Classes Schedule
                </motion.h2>

                <div className="p-4 w-full overflow-x-auto">
                    <div className="overflow-hidden">
                        <table className="w-full hidden md:table">
                            <thead className="bg-secondlight dark:bg-secondlight/20 border border-secondlight dark:border-secondlight/20">
                                <tr>
                                    <th className="p-3 text-center">Time</th>
                                    {days.map((day) => (
                                        <th key={day} className="p-3 text-center text-background dark:text-light">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {scheduleData.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? " " : ""}>
                                        <td className="p-3 w-h-full font-medium border border-secondlight dark:border-secondlight/20 text-center">{row.time}</td>
                                        {days.map((day) => (
                                            <td key={day} className="border border-secondlight dark:border-secondlight/20">
                                                <div>
                                                    {row[day] ? (
                                                        <div
                                                            className='px-3 py-6 flex flex-col justify-center items-center text-center m-1 hover:bg-primary cursor-pointer'
                                                            onClick={() => handleClassClick(row[day], row.time, day)}
                                                        >
                                                            <div className="font-semibold text-background dark:text-light">{row[day].class}</div>
                                                            <div className="text-sm text-secondary/60 dark:text-light/60">{row[day].instructor}</div>
                                                        </div>
                                                    ) : (
                                                        <div className='p-3 flex flex-col justify-center items-center text-center m-1'>
                                                            -
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="md:hidden">
                            {scheduleData.map((row, index) => (
                                <div key={index} className="py-4 border-b border-secondary/40 dark:border-secondlight/80">
                                    <div className="font-bold text-lg mb-2">{row.time}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {days.map((day) => {
                                            if (!row[day]) return null;
                                            return (
                                                <div
                                                    key={day}
                                                    className="group bg-secondlight/50 p-2 rounded cursor-pointer hover:bg-primary hover:text-light"
                                                    onClick={() => { handleClassClick(row[day], row.time, day) }}
                                                >
                                                    <div className="font-semibold text-sm">{day}</div>
                                                    <div className="font-medium hover:text-light">{row[day].class}</div>
                                                    <div className="text-xs text-secondary/80 dark:text-light/90 group-hover:text-light">{row[day].instructor}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/*model */}
            {selectedClass && (
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    backdrop="blur"
                    className="dark:bg-background dark:text-light"
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    {selectedClass.class}
                                </ModalHeader>
                                <ModalBody>
                                    <div className="space-y-4">
                                        <div className='flex justify-between items-center'>
                                            <p className="text-md text-secondary/70 dark:text-secondlight/80">{selectedClassDay}</p>
                                            <p className="text-md text-secondary/70 dark:text-secondlight/80">{selectedClassTime}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Instructor</h4>
                                            <p className="text-lg">{selectedClass.instructor}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Class Type</h4>
                                            <p className="text-lg">{selectedClass.class}</p>
                                        </div>
                                        <div className="pt-4">
                                            <button
                                                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors mb-2"
                                                onClick={() => {
                                                    onClose()
                                                    toast.success('Class Booked')
                                                }}
                                            >
                                                Book Class
                                            </button>
                                        </div>
                                    </div>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
            <Toaster className="z-50" richColors position="top-right" closeButton />
        </section>
    )
}

export default ClassSchedule