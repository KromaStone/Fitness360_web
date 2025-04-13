import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fadeIn } from '../../assets/utils/motion';
import { trainerCard } from '../../components/icons';

function TrainerCard({ id, TrainerName, TrainerDescription, TrainerImage, socialMediaLink1, socialMediaLink2, socialMediaLink3 }) {
    return (
        <>
            <div className="flex items-center justify-center w-full h-full">
                <motion.div
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("up", "", ((id - 1) / 5), (0.2))}
                    className={`group bg-transparent dark:bg-transparent p-1 rounded-3xl flex flex-col h-fit transition text ease-in-out duration-300 w-full max-w-[300px] mb-8`}
                >
                    <div className="relative top-12 flex flex-col items-center">
                        <motion.img
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={fadeIn("", "", 0.1, 0.2)}
                            src={TrainerImage} alt=""
                            className="w-64 relative top-[276px] -mt-[300px] z-10" />
                        <div className="relative w-full h-80 px-6">
                            <div className=" h-full w-full bg-background dark:bg-light rounded-t-full transition ease-in-out duration-300 "></div>

                            <div className="group-hover:h-full h-0 w-[calc(100%-48px)] bg-primary  dark:bg-primary rounded-t-full transition-all ease-in-out duration-300 absolute bottom-0"></div>
                        </div>
                    </div>
                    <LazyLoadImage src={trainerCard} alt="sc" className="w-fit h-fit relative -top-16 -mb-20 z-20 " />
                    <div className="bg-secondlight text-center pb-8 rounded-br-xl rounded-bl-xl borde-0 z-20">
                        <h2 className="text-2xl font-bold dark:text-background relative -top-6">{TrainerName}</h2>
                        <p className="text-background/80 font-medium text-sm relative -top-6 -mb-6">{TrainerDescription}</p>
                        <div className="flex gap-1 w-full items-center justify-center">
                            {/* Social icons */}
                            {socialMediaLink1 && (
                                <motion.a
                                    href={socialMediaLink1}
                                    target="_blank"
                                    whileInView="show"
                                    initial="hidden"
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={fadeIn("", "", 0.2, 0.4)}
                                    className="dark:hover:bg-light bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 -mb-[70px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-400
                                 hover:bg-gradient-to-tr hover:from-purple-500 hover:via-pink-500 hover:to-red-500 cursor-pointer"
                                >
                                    <Icon icon="line-md:instagram" width="20" className="hover:scale-125 transition ease-in-out duration-300" />
                                </motion.a>
                            )}
                            {socialMediaLink2 && (
                                <motion.a
                                    href={socialMediaLink2}
                                    target="_blank"
                                    whileInView="show"
                                    initial="hidden"
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={fadeIn("", "", 0.2, 0.4)}
                                    className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 -mb-[70px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-300
                                 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer"
                                >
                                    <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300" />
                                </motion.a>
                            )}
                            {socialMediaLink3 && (
                                <motion.a
                                    href={socialMediaLink3}
                                    target="_blank"
                                    whileInView="show"
                                    initial="hidden"
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={fadeIn("", "", 0.2, 0.4)}
                                    className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 -mb-[70px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-300
                                 hover:bg-gradient-to-tr hover:from-blue hover:via-cyan-600 hover:to-cyan-600 cursor-pointer"
                                >

                                    <Icon icon="line-md:twitter" width="20" className="hover:scale-125 transition ease-in-out duration-300" />
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default TrainerCard;