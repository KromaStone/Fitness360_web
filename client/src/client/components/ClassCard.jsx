import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { fadeIn } from '../../assets/utils/motion';

const ClassCard = ({ id, title, description, image }) => {
    return (
        <>
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, }}
                variants={fadeIn("up", "", ((id - 1) / 20), 0)}
                className='p-[2px] bg-gradient-to-t from-secondary/40 dark:from-secondlight/40 to-transparent hover:from-primary dark:hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible min-w-[280px] mb-4 sm:mb-0'
            >
                <div className='w-full h-full bg-secondlight dark:bg-secondary rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-7 pb-7 sm:pb-7 md:pb-7 lg:pb-7 flex flex-col justify-between'>
                    <LazyLoadImage
                        src={image}
                        alt={title}
                        className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300 aspect-[calc(4*3+1)/8] object-cover'
                    />
                    <h2 className="text-center my-2 md:my-3 text-md sm:text-lg md:text-xl font-bold">
                        {title}
                    </h2>
                    <p className="text-center text-background/80 font-medium dark:text-light/80 text-xs sm:text-md md:text-[14px]">
                        {description}
                    </p>

                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.1, 0.2)}
                        animate={{ rotate: 45 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-20 group-hover:border-t-primary group-hover:border-l-primary"
                    >
                        {/* <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full'></div> */}
                        <Icon
                            icon="line-md:facebook"
                            width="20"
                            className="hover:scale-125 transition ease-in-out duration-300 -rotate-45"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ClassCard;