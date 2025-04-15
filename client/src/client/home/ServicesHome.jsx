import React, { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import { fadeIn } from '../../assets/utils/motion';
import { useNavigate } from 'react-router-dom'
import { trainer5 } from '../../components/images'
import { NextButton } from '../../components/NextButton';

function ServicesHome() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

    const handlePlayPause = () => {
        const video = document.querySelector('video');
        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play();
            setIsPlaying(true);
        }
    };
    const serviceData = [
        {
            id: 1,
            serviceHeading: "Workout Videos",
            servicePara: "Access to hundreds of free, full-length workout videos.",
            serviceLink: "Learn More",
            serviceIcon: "token:gymnet",
        },
        {
            id: 2,
            serviceHeading: "Nutrition Guides",
            servicePara: "Get personalized nutrition plans and advice.",
            serviceLink: "Discover More",
            serviceIcon: "game-icons:meal",
        },
        {
            id: 3,
            serviceHeading: "Training Plans",
            servicePara: "Customized training plans tailored to your goals.",
            serviceLink: "Start Now",
            serviceIcon: "icon-park-solid:gymnastics-one",
        },
        {
            id: 4,
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
            <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center sm:gap-4 relative overflow-hidden">
                <div className='max-w-[1440px] m-auto'>

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
                                className="text-base sm:text-md lg:text-lg  items-center flex gap-2 text-primary uppercase font-semibold">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 p-4 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-2 xl:gap-8 2xl:gap-20 mt-6">
                        {serviceData.map((item, index) => (
                            <ServiceCard
                                key={index}
                                serviceHeading={item.serviceHeading}
                                servicePara={item.servicePara}
                                serviceIcon={item.serviceIcon}
                                serviceLink={item.serviceLink}
                                id={item.id}
                            />
                        ))}
                    </div>


                    <div className='w-full flex flex-col lg:flex-row my-6 md:my-12 lg:my-16 xl:my-20'>

                        <div className='w-full lg:w-1/2  flex items-center justify-center rounded-xl'
                            style={{ backgroundImage: `url(${trainer5})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>

                        <div className='w-full lg:w-1/2 p-1 sm:px-2 md:px-4 lg:px-8 xl:px-12 2xl:px-16 flex flex-col'>
                            <p className="text-base sm:text-md lg:text-lg items-center flex gap-2 text-primary uppercase font-semibold mb-2 md:mb-3 lg:mb-4 xl:mb-5 ">
                                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> about us
                            </p>
                            <h2 className='text-xl sm:text-2xl lg:text-3xl font-black text-left'>Invigorating Fitness Workouts For
                                Unleashing Potential With
                                Intense Fitness Workouts
                            </h2>
                            <p className='text-XS sm:text-sm lg:text-base xl:text-base 2xl:text-lg my-2 sm:my-4 c-text-gray text-left text-secondary/60 dark:text-secondlight/50'>
                                Body fitness encompasses various aspects of physical health and well-being,
                                involving a combination of exercise, nutrition, and lifestyle choices. Achieving and
                                maintaining optimal body fitness contributes to overall health, vitality.
                            </p>
                            <ul className='text-base sm:text-md lg:text-lg  text-secondary dark:text-secondlight capitalize  text-secondary/60 dark:text-secondlight/50  mb-2 sm:mb-4'>
                                <li className='items-center flex gap-2'>
                                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> Over 15 years of experience
                                </li>
                                <li className='items-center flex gap-2'>
                                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> Certified Trainers
                                </li>
                                <li className='items-center flex gap-2 mb-2 md:mb-3 lg:mb-4 xl:mb-5'>
                                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> Exceptional work quality
                                </li>

                            </ul>
                            {/* mb-2 md:mb-3 lg:mb-4 xl:mb-5 */}
                            {/* items-center flex gap-2 */}
                            <div className='flex gap-6  items-start uppercase'>
                                <NextButton color="secondary" className="w-full md:w-36 xl:w-44 ">Read More</NextButton>

                                <NextButton type="background" className="w-full   md:w-36 xl:w-44">View Class Schedule</NextButton>
                            </div>
                        </div>
                    </div>





                    {/* stat  */}
                    <div className='flex justify-between xl:px-2'>
                        {stats.map((stat, index) => (
                            <div key={index} ref={stat.ref} className="flex flex-col items-center justify-center w-fit">
                                <p className="flex justify-center items-center">
                                    <motion.span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                                        {stat.value}
                                    </motion.span>
                                    <span className="text-base sm:text-md lg:text-lg xl:text-4xl font-bold text-primary">+</span>
                                </p>
                                <p className="text-center text-[8px] sm:text-sm md:text-base lg:text-lg xl:text-xl mt-[1px] md-[2px] xl:mt-1">
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