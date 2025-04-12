/* eslint-disable no-unused-vars */
import check from '../../assets/icons/check.png';
import { motion } from "framer-motion";
import { fadeIn } from '../../assets/utils/motion.js';
import { useEffect, useState } from 'react';
import { NextButton } from '../../components/NextButton.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PlansCard from '../../client/components/PlansCard.jsx';
function JoinToday() {
    const [isMonth, setIsMonth] = useState(false);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        });

        const section = document.querySelector('.yearly-packs');
        if (section) observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    const monthYearToggle = () => {
        setIsMonth(prevMonth => !prevMonth);
    };

    const handleClick = () => {
        alert('Join Now button clicked');
    };

    // Realistic pricing plans data
    const yearlyPlans = [
        {
            name: "Starter Pack",
            price: 99.9,
            description: "Perfect for individuals getting started with fitness",
            features: [
                "Access to basic workout plans",
                "3 trainer consultations per year",
                "Nutrition guide included",
                "Weekly progress reports",
                "Access to community forums",
                "2 free guest passes monthly",
                "Discounts on merchandise"
            ]
        },
        {
            name: "Premium Pack",
            price: 149.9,
            description: "Ideal for serious fitness enthusiasts",
            features: [
                "All Starter Pack features",
                "Unlimited trainer consultations",
                "Customized workout plans",
                "Meal planning assistance",
                "Biometric assessments quarterly",
                "Priority class booking",
                "Access to premium equipment"
            ]
        },
        {
            name: "Family Pack",
            price: 249.9,
            description: "Great for families training together",
            features: [
                "All Premium Pack features",
                "Covers up to 4 family members",
                "Family nutrition planning",
                "Group training sessions",
                "Childcare services included",
                "Family fitness challenges",
                "Exclusive family events"
            ]
        }
    ];

    const monthlyPlans = [
        {
            name: "Basic Plan",
            price: 19.9,
            description: "Try out our services with no long-term commitment",
            features: [
                "Access to standard equipment",
                "1 trainer consultation per month",
                "Basic fitness assessment",
                "Access to group classes",
                "Mobile app tracking"
            ]
        },
        {
            name: "Standard Plan",
            price: 29.9,
            description: "More features for regular gym-goers",
            features: [
                "All Basic Plan features",
                "3 trainer consultations monthly",
                "Personalized workout plans",
                "Nutrition guidelines",
                "Progress tracking tools"
            ]
        },
        {
            name: "VIP Plan",
            price: 49.9,
            description: "Maximum benefits for dedicated fitness lovers",
            features: [
                "All Standard Plan features",
                "Unlimited trainer access",
                "24/7 gym access",
                "Locker and towel service",
                "Spa and sauna access"
            ]
        }
    ];

    return (
        <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center sm:gap-4">
            <div className=' max-w-[1550px] w-full m-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-5 w-full'>
                    <div>
                        <motion.p
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.3, 0.5)}
                            className='text-xl mx-2 flex items-center  text-primary'>Pricing Plan
                            <span className="bg-gradient-to-l from-transparent to-primary h-[2px] rounded-md w-12 inline-block ml-1"></span></motion.p>
                        <motion.h2
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.5, 0.5)}
                            className='text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl my-2 font-extrabold'>Join Today</motion.h2>
                    </div>
                    <div>
                        <div className="relative w-[150px] h-[36px] mt-[-20px] mx-auto overflow-hidden drop-shadow-x border-1 border-background dark:border-light pb-[8px] bg-light dark:bg-background rounded-xl cursor-pointer" onClick={monthYearToggle}>
                            <div className="absolute inset-0 flex items-center justify-start z-20 transition-all duration-300 ease-linear ml-1">
                                <span className={isMonth === true ? 'dark:text-background absolute left-2  z-10 transition-all duration-300 ease-linear m-2 text-light ' : 'absolute left-2  z-10 transition-all duration-300 ease-linear m-2 text-background  dark:text-light'}>Month</span>

                                <span className={isMonth === false ? 'absolute right-3 top-[-2px] z-10 transition-all duration-300 ease-linear m-2 text-light dark:text-background' : 'absolute right-3 top-[-2px] z-10 transition-all duration-300 ease-linear m-2 text-background dark:text-light'}>Year</span>

                                <div className={`${isMonth ? 'absolute left-0 top-1 w-20 h-[28px] bg-background rounded-xl transition-all duration-300 ease-linear dark:bg-light' : 'absolute left-[76px] top-1 w-16 h-[28px] bg-background dark:bg-light rounded-xl transition-all duration-300 ease-linear'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full min-w-[320px] rounded-2xl bg-light dark:bg-background py-2'>
                    {/* Yearly Packs */}
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.2, 0.6)}
                        className={`yearly-packs ${isMonth ? 'hidden' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols- gap-4 sm:gap-8  mt-6'}`}>
                        <PlansCard
                            plans={yearlyPlans}
                            handleClick={handleClick}
                        />
                    </motion.div>

                    {/* Monthly Packs */}
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.2, 0.6)}
                        className={`${isMonth ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8  mt-6' : 'hidden'}`}>
                        <PlansCard
                            plans={monthlyPlans}
                            handleClick={handleClick}
                        />
                    </motion.div>
                </div>
            </div>
        </section >
    );
}

export default JoinToday;
