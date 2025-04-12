import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '../../assets/utils/motion';
import { trainer5, trainer4, trainer6, trainer7 } from '../../components/images'
import ArticleCard from '../../client/components/ArticleCard';

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
        <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center sm:gap-4">
            <div className='max-w-[1550px] m-auto'>
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



                <div className='w-full min-w-[320px] rounded-2xl bg-light dark:bg-background py-2'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-8  mt-6">
                        <ArticleCard articles={articles} />
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Article