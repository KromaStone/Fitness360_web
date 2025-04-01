import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../assets/utils/motion';
import { trainer5, trainer4, trainer6, trainer7 } from '../../components/images'
import { Icon } from "@iconify/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Article() {
    const articles = [
        {
            title: "Personal Training",
            description: "Our certified personal trainers will work with you one-on-one to create a customized fitness plan that aligns with your goals, whether it's weight loss, strength training, or overall fitness.",
            authorName: "John Doe",
            articleLink: 'https://fitness360.vercel.app/',
            articleDate: "01 April 2025",
            articleImage: trainer4,

        },
        {
            title: "Group Fitness Classes",
            description: "Join our fun and energetic group fitness classes designed to challenge you and keep you motivated. From high-intensity interval training (HIIT) to yoga, there's a class for every fitness level.",
            authorName: "Jane Smith",
            articleLink: 'https://fitness360.vercel.app/',
            articleDate: "15 April 2025",
            articleImage: trainer5,
        },
        {
            title: "Nutrition Coaching",
            description: "Achieve your fitness goals faster with personalized nutrition guidance. Our experts will provide you with meal plans, dietary advice, and the motivation you need to fuel your body correctly.",
            authorName: "Alice Johnson",
            articleLink: 'https://fitness360.vercel.app/',
            articleDate: "20 April 2025",
            articleImage: trainer6,
        },
        {
            title: "Virtual Coaching",
            description: "Can't make it to the gym? No problem! Our virtual fitness coaching allows you to work with a trainer from the comfort of your home, wherever you are, through video calls and tailored workout plans.",
            authorName: "Bob Brown",
            articleLink: 'https://fitness360.vercel.app/',
            articleDate: "25 April 2025",
            articleImage: trainer7,
        }

    ];
    return (
        <section className=" py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32  xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
            <div className=' max-w-[1550px] m-auto'>
                <motion.p
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.3, 0.5)}
                    className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2  text-primary uppercase font-semibold">
                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block font-semibold"></span>BLOG POSTS<span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                </motion.p>
                <motion.h2
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.2, 0.5)}
                    className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize  mb-2 lg:mb-8">
                    Our Latest News & Articles
                </motion.h2>



                <div className='w-full min-w-[320px] rounded-2xl bg-light dark:bg-background p-4'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8  mt-6">
                        {articles.map((article, index) => (
                            <div className='w-full border-2 dark:border-secondlight/20 border-secondary/20 rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-7 flex flex-col justify-between group' key={index}>
                                <div className='h-6 flex justify-left items-center text-secondary/80 dark:text-light/70  text-xs sm:text-md md:text-[14px]'>
                                    <p className=' p-0 pr-4 flex items-center'>
                                        <Icon icon="hugeicons:user" width={16} className='text-primary' />
                                        <span className='pl-1'> {article.authorName}</span>
                                    </p>
                                    <span className='bg-background/70 dark:bg-light/70 w-[2px] h-4'></span>
                                    <p className='p-0 pl-4 flex items-center'>
                                        <Icon icon="uit:calender" className='text-primary' width={18} />
                                        <span className='pl-1'>{article.articleDate}</span>
                                    </p>
                                </div>
                                <h2 className="text-left my-2 md:my-3 text-md sm:text-lg md:text-xl xl:text-2xl font-bold">{article.title}</h2>

                                <p className="text-left text-background/80 font-medium dark:text-secondlight/80 text-xs sm:text-md md:text-[14px]">{article.description}</p>
                                <a href={article.articleLink} className='uppercase underline text-primary mt-2 mb-4 flex items-center justify-start gap-2 hover:scale-105 w-fit font-semibold transition-all ease-in-out duration-300  text-xs sm:text-sm md:text-base'>
                                    <span>
                                        read more
                                    </span>
                                    <Icon icon="line-md:arrow-right" className='text-primary' width={20} />
                                </a>


                                <LazyLoadImage
                                    src={article.articleImage}
                                    alt={article.title}
                                    className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300 aspect-[calc(4*3+1)/8] object-cover group-hover:scale-105'

                                />
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Article