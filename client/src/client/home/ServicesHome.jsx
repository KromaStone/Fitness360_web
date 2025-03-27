import React, { useEffect, useRef } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import { fadeIn } from '../../assets/utils/motion';
import { useNavigate } from 'react-router-dom'
function ServicesHome() {
    const navigate = useNavigate()
    const serviceClick = () => {
        navigate('/service')
    }

    const experienceRef = useRef(null)
    const customerRef = useRef(null)
    const trainerRef = useRef(null)
    const followerRef = useRef(null)

    const experienceCount = useMotionValue(0)
    const customerCount = useMotionValue(0)
    const trainerCount = useMotionValue(0)
    const followerCount = useMotionValue(0)

    const formatNumber = (value) => Math.round(value)
    const formatLargeNumber = (value) => {
        const rounded = Math.round(value)
        return rounded >= 1000 ? `${(rounded / 1000).toFixed(0)}k` : rounded.toString()
    }

    const formattedExperience = useTransform(experienceCount, formatNumber)
    const formattedCustomers = useTransform(customerCount, formatNumber)
    const formattedTrainers = useTransform(trainerCount, formatNumber)
    const formattedFollowers = useTransform(followerCount, formatLargeNumber)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === experienceRef.current) {
                            animate(experienceCount, 10, { duration: 2 })
                        }
                        else if (entry.target === customerRef.current) {
                            animate(customerCount, 500, { duration: 2 })
                        }
                        else if (entry.target === trainerRef.current) {
                            animate(trainerCount, 50, { duration: 2 })
                        }
                        else if (entry.target === followerRef.current) {
                            animate(followerCount, 15000, { duration: 2 })
                        }
                    }
                })
            },
            { threshold: 0.5 }
        )

        if (experienceRef.current) observer.observe(experienceRef.current)
        if (customerRef.current) observer.observe(customerRef.current)
        if (trainerRef.current) observer.observe(trainerRef.current)
        if (followerRef.current) observer.observe(followerRef.current)

        return () => observer.disconnect()
    }, [])

    const serviceData = [
        {
            serviceHeading: "Workout Videos",
            servicePara: "Access to hundreds of free, full-length workout videos.",
            serviceLink: "Learn More",
            serviceIcon: "token:gymnet",
        },
        {
            serviceHeading: "Nutrition Guides",
            servicePara: "Get personalized nutrition plans and advice.",
            serviceLink: "Discover More",
            serviceIcon: "game-icons:meal",
        },
        {
            serviceHeading: "Training Plans",
            servicePara: "Customized training plans tailored to your goals.",
            serviceLink: "Start Now",
            serviceIcon: "icon-park-solid:gymnastics-one",
        },
        {
            serviceHeading: "Community Support",
            servicePara: "Join a community of like-minded fitness enthusiasts.",
            serviceLink: "Join Now",
            serviceIcon: "fluent:person-support-24-filled",
        }
    ]

    const stats = [
        { ref: experienceRef, value: formattedExperience, label: 'Year of Experience' },
        { ref: customerRef, value: formattedCustomers, label: 'Happy Customer' },
        { ref: trainerRef, value: formattedTrainers, label: 'Expert Trainer' },
        { ref: followerRef, value: formattedFollowers, label: 'Instagram Follower' },
    ];

    return (
        <>
            <section className=" py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4 relative overflow-hidden w-full ">
                <div className=' max-w-[1550px] m-auto'>

                    <div className='w-16 md:w-[70px] lg:w-[80px] xl:w-[120px] 2xl:w-[134px] -left-[48px] md: lg: xl:-left-[60px]  2xl:-left-[70px] top-16 md: lg: xl:top-24  2xl: aspect-square absolute -rotate-45 bg-gradient-to-bl from-50% from-gray-400 to-secondlight  to-50% dark:from-black dark:to-secondary'></div>
                    <div className='w-16 md:w-[70px] lg:w-[80px] xl:w-[120px] 2xl:w-[134px] -left-[48px] md: lg: xl:-left-[60px]  2xl:-left-[70px] top-24 md:top-[98px] lg:top-[112px] xl:top-[180px]  2xl:top-[186px]  aspect-square absolute -rotate-45 bg-gradient-to-bl from-50% from-gray-400 to-secondlight  to-50% dark:from-black dark:to-secondary'></div>
                    <div className='w-16 md:w-[70px] lg:w-[80px] xl:w-[120px] 2xl:w-[134px] -right-[48px] md: lg: xl:-right-[60px]  2xl:-right-[70px] top-16 md: lg: xl:top-24  2xl: aspect-square absolute -rotate-45 bg-gradient-to-bl from-50% from-gray-400 to-secondlight  to-50% dark:from-black dark:to-secondary'></div>
                    <div className='w-16 md:w-[70px] lg:w-[80px] xl:w-[120px] 2xl:w-[134px] -right-[48px] md: lg: xl:-right-[60px]  2xl:-right-[70px] top-24 md:top-[98px] lg:top-[112px] xl:top-[180px]  2xl:top-[186px]  aspect-square absolute -rotate-45 bg-gradient-to-bl from-50% from-gray-400 to-secondlight  to-50% dark:from-black dark:to-secondary'></div>

                    <div className='flex flex-col sm:flex-row justify-between items-center gap-5 w-full'>
                        <div>
                            <motion.p
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", 0.3, 0.5)}
                                className="text-base sm:text-md lg:text-lg  items-center flex gap-2 text-secondary dark:text-secondlight uppercase font-semibold">
                                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> our services
                            </motion.p>
                            <motion.h2
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", 0.2, 0.5)}
                                className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center">
                                Our Service For You
                            </motion.h2>
                        </div>
                        <button className='py-2 px-4 border-primary bg-transparent border-1  hover:bg-primary rounded-3xl hover:text-light transition duration-300 ease-in-out' onClick={serviceClick}>
                            See all Services
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-16 xl:gap-20 mt-6">
                        {serviceData.map((item, index) => (
                            <ServiceCard
                                key={index}
                                serviceHeading={item.serviceHeading}
                                servicePara={item.servicePara}
                                serviceIcon={item.serviceIcon}
                                serviceLink={item.serviceLink}
                            />
                        ))}
                    </div>

                    {/* stat  */}
                    <div className='mt-2 md:mt-6 lg:mt-9 xl:mt-12 flex justify-between xl:px-2'>
                        {stats.map((stat, index) => (
                            <div key={index} ref={stat.ref} className="flex flex-col items-center justify-center w-fit">
                                <p className="flex justify-center items-center">
                                    <motion.span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                                        {stat.value}
                                    </motion.span>
                                    <span className="text-base sm:text-md lg:text-lg xl:text-4xl font-bold text-primary">+</span>
                                </p>
                                <p className="text-center text-xs sm:text-md lg:text-lg xl:text-xl mt-[1px] md-[2px] xl:mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section>

            </section>
        </>
    )
}

export default ServicesHome