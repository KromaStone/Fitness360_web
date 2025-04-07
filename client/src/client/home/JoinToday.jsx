/* eslint-disable no-unused-vars */
import check from '../../assets/icons/check.png';
import { motion } from "framer-motion";
import { fadeIn } from '../../assets/utils/motion.js';
import { useEffect, useState } from 'react';
import { NextButton } from '../../components/NextButton.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component'
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
        <section className=" py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32  xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
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

                <div className='w-full min-w-[320px] rounded-2xl bg-light dark:bg-background p-4'>
                    {/* Yearly Packs */}
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.2, 0.6)}
                        className={`yearly-packs ${isMonth ? 'hidden' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols- gap-4 sm:gap-8  mt-6'}`}>
                        {yearlyPlans.map((plan, index) => (
                            <motion.div
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", index * 0.2, 0.4)}
                                key={index}
                                className="text-left flex flex-col border-primary/50 border-1 rounded-xl xs:rounded-2xl my-2 xs:my-3 sm:my-4 py-3 xs:py-4 px-3 xs:px-4 sm:px-5 transition duration-300 ease-in-out bg-gradient-to-tl from-secondlight/40  from-10% via-secondlight/20 to-secondlight/40 dark:from-background dark:to-secondary">
                                <p className='text-sm xs:text-base sm:text-lg md:text-xl mb-1 xs:mb-2 opacity-85 font-bold'>{plan.name}</p>
                                <h2 className='text-2xl xs:text-3xl sm:text-4xl font-bold'>${plan.price} <span className="text-xs xs:text-sm font-semibold">/Year</span></h2>
                                <p className='mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-md'>{plan.description}</p>
                                <ul className='mt-4 xs:mt-5 sm:mt-6 mb-6 xs:mb-8 sm:mb-10 md:mb-12'>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className='flex items-center my-1 xs:my-1.5 sm:my-2 text-xs xs:text-sm sm:text-md'>
                                            <LazyLoadImage src={check} alt="check icon" className='mr-1 xs:mr-2 w-3 xs:w-4 h-3 xs:h-4' /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <NextButton onClick={handleClick} color="" className="text-xs xs:text-sm sm:text-md">Join Now</NextButton>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Monthly Packs */}
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.2, 0.6)}
                        className={`${isMonth ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8  mt-6' : 'hidden'}`}>
                        {monthlyPlans.map((plan, index) => (
                            <motion.div
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", index * 0.2, 0.4)}
                                key={index}
                                className="text-left flex flex-col border-primary/50 border-1 rounded-xl xs:rounded-2xl my-2 xs:my-3 sm:my-4 py-3 xs:py-4 px-3 xs:px-4 sm:px-5 transition duration-300 ease-in-out bg-gradient-to-tr from-secondlight/40  from-10% via-secondlight/20 to-secondlight/40 dark:from-background dark:to-secondary">
                                <p className='text-sm xs:text-base sm:text-lg md:text-xl mb-1 xs:mb-2 opacity-85 font-bold'>{plan.name}</p>
                                <h2 className='text-2xl xs:text-3xl sm:text-4xl font-bold'>${plan.price} <span className="text-xs xs:text-sm font-semibold">/Month</span></h2>
                                <p className='mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-md'>{plan.description}</p>
                                <ul className='mt-4 xs:mt-5 sm:mt-6 mb-6 xs:mb-8 sm:mb-10 md:mb-12'>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className='flex items-center my-1 xs:my-1.5 sm:my-2 text-xs xs:text-sm sm:text-md'>
                                            <LazyLoadImage src={check} alt="check icon" className='mr-1 xs:mr-2 w-3 xs:w-4 h-3 xs:h-4' /> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <NextButton onClick={handleClick} color="" className="text-xs xs:text-sm sm:text-md">Join Now</NextButton>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section >
    );
}

export default JoinToday;
