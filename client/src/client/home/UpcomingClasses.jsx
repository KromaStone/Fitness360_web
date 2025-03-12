import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion'
import { fadeIn } from '../../assets/utils/motion';
import { trainer5 } from '../../components/images'
import { Icon } from "@iconify/react";

function UpcomingClasses() {
    return (

        <section className=" py-8  sm:py-16 lg:py-20px-4 sm:px-8 lg:px-32 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
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
            </div>


            <div className='w-full rounded-2xl bg-light dark:bg-background p-4'>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-16 xl:gap-20 mt-6">
                        <SwiperSlide className='pb-8'>
                            <div className='p-[2px] bg-gradient-to-t from-transparent to-transparent hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible'>
                                <div className='w-full  bg-secondlight rounded-xl p-7 flex flex-col justify-between '>
                                    <img src={trainer5} alt="" className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300' />
                                    <h2 className="text-center my-4 text-2xl font-bold">Heading</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, amet repellat id officia quam hic molestiae quo nam blanditiis porro?</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary 
                                    "
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full '> </div>


                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>


                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='pb-8'>
                            <div className='p-[2px] bg-gradient-to-t from-transparent to-transparent hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible'>
                                <div className='w-full  bg-secondlight rounded-xl p-7 flex flex-col justify-between '>
                                    <img src={trainer5} alt="" className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300' />
                                    <h2 className="text-center my-4 text-2xl font-bold">Heading</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, amet repellat id officia quam hic molestiae quo nam blanditiis porro?</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary 
                                    "
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full '> </div>


                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>


                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='pb-8'>
                            <div className='p-[2px] bg-gradient-to-t from-transparent to-transparent hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible'>
                                <div className='w-full  bg-secondlight rounded-xl p-7 flex flex-col justify-between '>
                                    <img src={trainer5} alt="" className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300' />
                                    <h2 className="text-center my-4 text-2xl font-bold">Heading</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, amet repellat id officia quam hic molestiae quo nam blanditiis porro?</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary 
                                    "
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full '> </div>


                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>


                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='pb-8'>
                            <div className='p-[2px] bg-gradient-to-t from-transparent to-transparent hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible'>
                                <div className='w-full  bg-secondlight rounded-xl p-7 flex flex-col justify-between '>
                                    <img src={trainer5} alt="" className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300' />
                                    <h2 className="text-center my-4 text-2xl font-bold">Heading</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, amet repellat id officia quam hic molestiae quo nam blanditiis porro?</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary 
                                    "
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full '> </div>


                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>


                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='pb-8'>
                            <div className='p-[2px] bg-gradient-to-t from-transparent to-transparent hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible'>
                                <div className='w-full  bg-secondlight rounded-xl p-7 flex flex-col justify-between '>
                                    <img src={trainer5} alt="" className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300' />
                                    <h2 className="text-center my-4 text-2xl font-bold">Heading</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, amet repellat id officia quam hic molestiae quo nam blanditiis porro?</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary 
                                    "
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full '> </div>


                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>


                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='pb-8'>
                            <div className='p-[2px] bg-gradient-to-t from-transparent to-transparent hover:from-primary rounded-xl group transition-all ease-in-out duration-300 overflow-visible'>
                                <div className='w-full  bg-secondlight rounded-xl p-7 flex flex-col justify-between '>
                                    <img src={trainer5} alt="" className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300' />
                                    <h2 className="text-center my-4 text-2xl font-bold">Heading</h2>
                                    <p className="text-center text-background/80 font-medium dark:text-light/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, amet repellat id officia quam hic molestiae quo nam blanditiis porro?</p>

                                    <motion.div
                                        whileInView="show"
                                        initial="hidden"
                                        viewport={{ once: false, amount: 0.2 }}
                                        variants={fadeIn("", "", 0.2, 0.4)}
                                        animate={{ rotate: 45 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-secondary dark:bg-light dark:text-background dark:hover:text-light w-12 h-12 rounded-full relative bottom-1 mx-auto -mb-[58px] flex items-center justify-center border-[4px] text-light border-light dark:border-background transition ease-in-out duration-100 hover:bg-gradient-to-tr hover:from-blue hover:via-indigo-500 hover:to-purple-500 cursor-pointer z-50 group-hover:border-t-primary group-hover:border-l-primary 
                                    "
                                    >
                                        <div className='w-12 h-12 group-hover:w-[44px] group-hover:h-[44px] absolute bg-transparent border-[4px] rounded-full '> </div>


                                        <Icon icon="line-md:facebook" width="20" className="hover:scale-125 transition ease-in-out duration-300 -rotate-45" />
                                    </motion.div>


                                </div>
                            </div>
                        </SwiperSlide>
                    </div>

                </Swiper >
            </div >
        </section >
    )
}

export default UpcomingClasses