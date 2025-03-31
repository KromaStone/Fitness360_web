import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../assets/utils/motion';
import { categoryimg1, categoryimg2, categoryimg3, categoryimg4, categoryimg5, categoryimg6 } from '../../components/images'

function PhotoGallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const carouselItems = [
        { id: 1, title: 'Push-Up Challenge', workoutType: 'Bodyweight Strength', workoutImage: categoryimg1 },
        { id: 2, title: 'Morning Yoga Flow', workoutType: 'Yoga', workoutImage: categoryimg2 },
        { id: 3, title: 'HIIT Cardio Blast', workoutType: 'High-Intensity Interval Training', workoutImage: categoryimg3 },
        { id: 4, title: 'Leg Day Circuit', workoutType: 'Strength Training', workoutImage: categoryimg4 },
        { id: 5, title: 'Core Crusher', workoutType: 'Abs Workout', workoutImage: categoryimg5 },
        { id: 6, title: 'Full Body Burn', workoutType: 'Circuit Training', workoutImage: categoryimg6 }
    ];

    const scrollToItem = (index) => {
        setActiveIndex(index);
        if (carouselRef.current) {
            const container = carouselRef.current;
            const item = container.children[index];
            const scrollPosition = item.offsetLeft - (container.offsetWidth - item.offsetWidth) / 2;

            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (carouselRef.current) {
                const container = carouselRef.current;
                const scrollPosition = container.scrollLeft + container.offsetWidth / 2;

                Array.from(container.children).forEach((child, index) => {
                    const childLeft = child.offsetLeft;
                    const childWidth = child.offsetWidth;

                    if (scrollPosition > childLeft && scrollPosition < childLeft + childWidth) {
                        setActiveIndex(index);
                    }
                });
            }
        };

        const container = carouselRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-8 sm:py-16 lg:py-20 bg-light text-background dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 overflow-hidden">
            <motion.p
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.3, 0.5)}
                className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-primary uppercase font-semibold">
                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                OUR PORTFOLIO
                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
            </motion.p>

            <motion.h2
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.2, 0.5)}
                className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize">
                Our Portfolio Gallery
            </motion.h2>

            <div className="w-full  mx-auto relative">
                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto scrollbar-hide pb-2 gap-4 "
                >
                    {carouselItems.map((workout, index) => (
                        <div
                            key={workout.id}
                            className="relative z-0 flex-shrink-0 w-full md:w-1/4 min-w-[250px] mt-4 md:mt-6 lg:mt-11"
                        >
                            <div className="w-full py-32 bg-cyan-500/50 hover:-translate-y-11 transition-all ease-in-out duration-300 rounded-xl z-40" style={{ backgroundImage: `url(${workout.workoutImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            </div>

                            <div className="absolute bottom-0 left-0 px-2 -z-10 flex justify-between items-center w-full">
                                <div className='w-full'>
                                    <p className='text-xs text-secondary/70 dark:text-light/80'>{workout.workoutType}</p>
                                    <p className='font-semibold text-base'>{workout.title}</p>
                                </div>
                                <div className='h-full w-full text-right text-2xl font-bold text-secondary/80 dark:text-light/90'>
                                    {workout.id}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots - Only show if more than 4 items */}
                {carouselItems.length > 4 && (
                    <div className="flex justify-center items-center mt-4 space-x-2">

                        <span className="bg-gradient-to-l from-primary to-transparent h-[3px] rounded-md w-2/12 inline-block"></span>

                        {Array.from({ length: Math.ceil(carouselItems.length / 4) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToItem(index * 4)}
                                className={`w-3 h-3 rounded-full ${activeIndex >= index * 4 && activeIndex < (index + 1) * 4 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}

                        <span className="bg-gradient-to-r from-primary to-transparent h-[3px]  rounded-md w-2/12 inline-block"></span>
                    </div>
                )}
            </div>
        </section>
    );
}

export default PhotoGallery;