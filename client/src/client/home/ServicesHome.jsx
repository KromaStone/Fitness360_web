import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../components/ServiceCard'
import { fadeIn } from '../../assets/utils/motion';
import { useNavigate } from 'react-router-dom'
function ServicesHome() {
    const navigate = useNavigate()
    const serviceClick = () => {
        navigate('/service')
    }
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
    ];

    return (
        <>
            <section className=" py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
                <div className='flex flex-col sm:flex-row justify-between items-center gap-5 w-full'>
                    <div>
                        <motion.p
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.3, 0.5)}
                            className="text-base sm:text-md lg:text-lg  items-center flex gap-2 text-secondary dark:text-secondlight uppercase ">
                            <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> our services
                        </motion.p>
                        <motion.h2
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.2, 0.5)}
                            className="text-xl sm:text-3xl  lg:text-4xl xl:text-5xl font-bold tracking-wide fade_appear text-center">
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

            </section>
        </>
    )
}

export default ServicesHome