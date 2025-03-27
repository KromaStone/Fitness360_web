import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../assets/utils/motion';
import { trainer5, trainer4, trainer6, trainer7 } from '../../components/images'
import { Icon } from "@iconify/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UpcomingClasses() {
    const services = [
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

        <section className=" py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32  xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
            <div className=' max-w-[1550px] m-auto'>
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



                <div className='w-full min-w-[320px] rounded-2xl bg-light dark:bg-background p-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-16 xl:gap-20 mt-6">
                        {services.map((service, index) => (
                            <div className='p-[2px] bg-gradient-to-t from-secondary/40 dark:from-secondlight/40 to-transparent hover:from-primary dark:hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible' key={index}>
                                <div className='w-full bg-secondlight dark:bg-secondary rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-7 flex flex-col justify-between'>
                                    <LazyLoadImage
                                        src={service.image}
                                        alt={service.title}
                                        className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300 aspect-[calc(4*3+1)/8] object-cover'

                                    />
                                    <h2 className="text-center my-2 md:my-3 text-md sm:text-lg md:text-xl font-bold">{service.title}</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80 text-xs sm:text-md md:text-[14px]">{service.description}</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary"
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full'></div>
                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section >
    )
}

export default UpcomingClasses