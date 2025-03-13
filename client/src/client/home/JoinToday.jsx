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
                observer.disconnect(); // Stop observing once in view
            }
        });

        const section = document.querySelector('.yearly-packs');
        if (section) observer.observe(section);

        return () => {
            observer.disconnect(); // Cleanup on unmount
        };
    }, []);

    const monthYearToggle = () => {
        setIsMonth(prevMonth => !prevMonth);
    };

    const handleClick = () => {
        alert('Join Now button clicked');
    };

    return (
        <section className='py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-5 md:px-10 lg:px-20 xl:px-52 bg-cover h-auto bg-secondlight text-background dark:bg-background dark:text-light'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-5'>
                <div>
                    <motion.p
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.3, 0.5)}
                        className='text-xl mx-2  '>Pricing Plan</motion.p>
                    <motion.h2
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.5, 0.5)}
                        className='text-4xl md:text-6xl my-2 font-extrabold'>Join Today</motion.h2>
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

            {/* Yearly Packs */}
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.2, 0.6)}
                className={`yearly-packs ${isMonth ? 'hidden' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-12'}`}>
                {Array(3).fill().map((_, index) => (
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", index * 0.2, 0.4)}
                        key={index}
                        className="text-left flex flex-col  border-primary border-1 rounded-2xl my-4 py-4 px-5 transition duration-300 ease-in-out bg-gradient-to-tl from-light from-10% to-secondlight dark:from-background dark:to-secondary">
                        <p className='text-xl mb-2 opacity-85 font-bold'>Beginner Plan</p>
                        <h2 className='text-4xl font-extrabold'>$99.9 <span className="text-sm font-bold">/Year</span></h2>
                        <p className='mt-4  '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <ul className='  mt-8 mb-12'>
                            {Array(7).fill('Lorem ipsum dolor sit amet,').map((text, i) => (
                                <li key={i} className='flex items-center my-2'>
                                    <LazyLoadImage src={check} alt="check icon" className='mr-2 w-4 h-4' /> {text}
                                </li>
                            ))}
                        </ul>
                        <NextButton onClick={handleClick} color="secondlight" >Join Now</NextButton>
                    </motion.div>
                ))}
            </motion.div>

            {/* Monthly Packs */}
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.2, 0.6)}
                className={`${isMonth ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-12' : 'hidden'}`}>
                {Array(3).fill().map((_, index) => (
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", index * 0.2, 0.4)}
                        key={index}
                        className="text-left flex flex-col border-primary border-1 rounded-2xl my-4 py-4 px-5 transition duration-300 ease-in-out bg-gradient-to-tr from-light from-10% to-secondlight dark:from-background dark:to-secondary">
                        <p className='text-xl mb-2 opacity-85 font-bold'>Beginner Plan</p>
                        <h2 className='text-4xl font-extrabold'>$19.9 <span className="text-sm font-bold">/Month</span></h2>
                        <p className='mt-4  '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <ul className='  mt-8 mb-12'>
                            {Array(5).fill('Lorem ipsum dolor sit amet,').map((text, i) => (
                                <li key={i} className='flex items-center my-2'>
                                    <LazyLoadImage src={check} alt="check icon" className='mr-2 w-4 h-4' /> {text}
                                </li>
                            ))}
                        </ul>
                        <NextButton onClick={handleClick} color="secondlight" >Join Now</NextButton>
                    </motion.div>
                ))}
            </motion.div>


        </section >
    );
}

export default JoinToday;
