import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../assets/utils/motion';
import { trainer5, trainer4, trainer6, trainer7 } from '../../components/images'
import { Icon } from "@iconify/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ClassCard from '../../client/components/ClassCard';

function UpcomingClasses() {
    const classes = [
        {
            title: "Personal Training",
            description: "Our certified personal trainers will work with you one-on-one to create a customized fitness plan that aligns with your goals, whether it's weight loss, strength training, or overall fitness.",
            image: trainer4
        },
        {
            title: "Group Fitness Classes",
            description: "Join our fun and energetic group fitness classes designed to challenge you and keep you motivated. From high-intensity interval training (HIIT) to yoga, there's a class for every fitness level.",
            image: trainer5
        },
        {
            title: "Nutrition Coaching",
            description: "Achieve your fitness goals faster with personalized nutrition guidance. Our experts will provide you with meal plans, dietary advice, and the motivation you need to fuel your body correctly.",
            image: trainer6
        },
        {
            title: "Virtual Coaching",
            description: "Can’t make it to the gym? No problem! Our virtual fitness coaching allows you to work with a trainer from the comfort of your home, wherever you are, through video calls and tailored workout plans.",
            image: trainer7
        },
        // {
        //     title: "Workout Recovery",
        //     description: "Maximize your results and prevent injuries with our post-workout recovery services. From stretching sessions to foam rolling and massages, we help your body recover and prepare for your next session.",
        //     image: trainer5
        // }
    ];

    return (

        <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center sm:gap-4">
            <div className='max-w-[1550px] m-auto'>
                <motion.p
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.3, 0.5)}
                    className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2  text-primary uppercase font-semibold">
                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block font-semibold"></span>GYM & FITNESS TRAINING <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                </motion.p>
                <motion.h2
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.2, 0.5)}
                    className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize  mb-2 lg:mb-8">
                    Our Upcoming Classes
                </motion.h2>



                <div className='w-full min-w-[320px] rounded-2xl bg-light dark:bg-background pt-1'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-16 xl:gap-20 mt-6">
                        <ClassCard services={classes} />
                    </div>
                </div>
            </div>

        </section >
    )
}

export default UpcomingClasses