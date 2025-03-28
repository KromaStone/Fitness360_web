import React from 'react'
import { fadeIn } from '../../assets/utils/motion'
import { motion } from 'framer-motion'

function ClassSchedule() {
    const scheduleData = [
        {
            time: "06:00 - 07:00",
            Monday: { class: "FITNESS CLASS", instructor: "Robert Cage" },
            Tuesday: { class: "BOXING GYM", instructor: "Robert Cage" },
            Wednesday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Thursday: { class: "CROSSFIT PRO", instructor: "Robert Cage" },
            Friday: { class: "FITNESS CLASS", instructor: "Robert Cage" },
            Saturday: null,
            Sunday: null,
        },
        {
            time: "07:00 - 08:00",
            Monday: { class: "BODY PUMP", instructor: "Robert Cage" },
            Tuesday: { class: "CARDIO BOX", instructor: "Robert Cage" },
            Wednesday: { class: "YOGA CLASS", instructor: "Robert Cage" },
            Thursday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Friday: { class: "BOXING GYM", instructor: "Robert Cage" },
            Saturday: null,
            Sunday: null,
        },
        {
            time: "08:00 - 09:00",
            Monday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Tuesday: { class: "FITNESS CLASS", instructor: "Robert Cage" },
            Wednesday: { class: "YOGA CLASS", instructor: "Robert Cage" },
            Thursday: { class: "BOXING GYM", instructor: "Robert Cage" },
            Friday: { class: "CROSSFIT PRO", instructor: "Robert Cage" },
            Saturday: null,
            Sunday: null,
        },
        {
            time: "09:00 - 10:00",
            Monday: { class: "BOXING GYM", instructor: "Robert Cage" },
            Tuesday: { class: "CARDIO BOX", instructor: "Robert Cage" },
            Wednesday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Thursday: { class: "CROSSFIT PRO", instructor: "Robert Cage" },
            Friday: null,
            Saturday: null,
            Sunday: null,
        },
        {
            time: "10:00 - 11:00",
            Monday: { class: "OPEN GYM", instructor: "Robert Cage" },
            Tuesday: { class: "FITNESS CLASS", instructor: "Robert Cage" },
            Wednesday: { class: "YOGA CLASS", instructor: "Robert Cage" },
            Thursday: null,
            Friday: null,
            Saturday: null,
            Sunday: null,
        },
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <section className=" py-8 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4 relative overflow-hidden w-full ">
            <div className='w-full max-w-[1550px] m-auto'>
                <motion.p
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.3, 0.5)}
                    className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2  text-primary uppercase font-semibold">
                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block font-semibold"></span>Our class <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                </motion.p>
                <motion.h2
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.2, 0.5)}
                    className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize  mb-2 lg:mb-8">
                    Training Classes Schedule
                </motion.h2>


                <div className="p-4 w-full overflow-x-auto">
                    <div className="overflow-hidden">

                        <table className="w-full hidden md:table">
                            <thead className="bg-secondlight ">
                                <tr>
                                    <th className="p-3 text-center">Time</th>
                                    {days.map((day) => (
                                        <th key={day} className="p-3 text-center  text-background dark:text-light">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {scheduleData.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="p-3 font-medium border text-center">{row.time}</td>
                                        {days.map((day) => (
                                            <td key={day} className="p-3 border hover:bg-primary/50 hover:border-primary">
                                                {row[day] ? (
                                                    <div className='flex flex-col justify-center items-center text-center'>
                                                        <div className="font-semibold">{row[day].class}</div>
                                                        <div className="text-sm text-gray-600">{row[day].instructor}</div>
                                                    </div>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                        <div className="md:hidden">
                            {scheduleData.map((row, index) => (
                                <div key={index} className="p-4 border-b border-gray-200">
                                    <div className="font-bold text-lg mb-2">{row.time}</div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {days.map((day) => {
                                            if (!row[day]) return null;
                                            return (
                                                <div key={day} className="bg-gray-50 p-2 rounded">
                                                    <div className="font-semibold text-sm">{day}</div>
                                                    <div className="font-medium">{row[day].class}</div>
                                                    <div className="text-xs text-gray-600">{row[day].instructor}</div>
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

        </section >
    )
}

export default ClassSchedule