import { motion } from 'framer-motion'
import { fadeIn } from '../assets/utils/motion'
import { watchVideo } from '../components/images'
import { useState } from 'react';
import { Icon } from "@iconify/react";

function ChooseUs() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


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
    return (
        <section className=" py-8  sm:py-16 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
            <motion.p
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.3, 0.5)}
                className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-secondary dark:text-secondlight uppercase font-semibold">
                <span className="bg-primary h-[2px] rounded-md w-10 inline-block "></span>why choose us <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
            </motion.p>
            <motion.h2
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.2, 0.5)}
                className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize  mb-2 lg:mb-8">
                keep going with your passion
            </motion.h2>

            <div className='w-full flex flex-col lg:flex-row  '>

                <div className='w-full lg:w-1/2  flex items-center justify-center'
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <video
                        src={watchVideo}
                        className="w-full rounded-none"
                        controls={false}
                        onClick={handlePlayPause}
                    />
                    {!(isPlaying) && isHovered && (
                        <button
                            className={`absolute flex items-center justify-center text-white text-6xl font-bold cursor-pointer bg-light/50 p-0 hover:p-4 rounded-full border-light/60 border-1 transition-all ease-in-out duration-300 transform hover:scale-110 `}
                            onClick={handlePlayPause}
                        >
                            <Icon
                                className="bg-light rounded-full p-3"
                                icon="solar:play-bold"
                                color="#16b650"
                            />
                        </button>

                    )}

                    {isPlaying && isHovered && (
                        <button
                            className={`absolute flex items-center justify-center text-white text-6xl font-bold cursor-pointer bg-light/50 p-0 hover:p-4 rounded-full border-light/60 border-1 transition-all ease-in-out duration-300 transform hover:scale-110 `}
                            onClick={handlePlayPause}
                        >
                            <Icon
                                className="bg-light rounded-full p-3"
                                icon="solar:pause-bold"
                                color="#16b650"
                            />
                        </button>
                    )}

                    {!isPlaying &&
                        <motion.p
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.2, 0.2)}
                            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold absolute right-0 top-0 p-2 text-light/60">Watch Video</motion.p>
                    }
                </div>

                <div className='w-full lg:w-1/2 p-1 sm:p-2 md:p-4 lg:p-8 xl:p-12 2xl:p-16 bg-secondlight dark:bg-secondary/40'>
                    <h2 className='text-xl sm:text-2xl lg:text-3xl font-black  text-left'>Invigorating Fitness Workouts For
                        Body And Mind</h2>
                    <p className='text-XS sm:text-sm md:text-  lg:text-base xl:text-base 2xl:text-lg my-2 sm:my-4 c-text-gray text-left text-secondary dark:text-secondlight'>
                        Regular fitness workouts contribute to weight management, improved muscle
                        tone, increased bone density, and enhanced cardiovascular health. Fitness
                        workouts are known to have positive effects on mental health, reducing stress,
                        anxiety, and depression.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ChooseUs