
import coach1 from '../../assets/images/coach1.avif'
import coach2 from '../../assets/images/coach2.jpg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion } from "framer-motion";
import { fadeIn } from "../../assets/utils/motion";
import { NextButton } from '../../components/NextButton';
import { ScrollShadow } from '@nextui-org/react';
import { review1, review2, review3, review4 } from '../../components/images'
import { Icon } from "@iconify/react";
import { banner } from '../../components/images'
import { useState } from 'react';

const reviews = [
    { id: 2, userName: 'John Smith', image: review2, stars: 4, reviewTitle: 'Amazing Experience', reviewContent: 'The best personal training experience had! The trainer really focused on my goals and I saw great results in just a few weeks. Highly recommend!' },
    { id: 3, userName: 'Emily Clark', image: review3, stars: 3, reviewTitle: 'Decent but Room for Improvement', reviewContent: 'The training sessions were good, but there was not much variety in the workouts. A bit more creativity would have made it more enjoyable.' },
    { id: 4, userName: 'Chris Lee', image: review4, stars: 4.8, reviewTitle: 'Excellent Training', reviewContent: 'Very professional and knowledgeable trainer. I felt challenged but not overwhelmed. Highly recommend for anyone serious about fitness.' },
    { id: 6, userName: 'Michael Turner', image: review2, stars: 4.8, reviewTitle: 'Great Results!', reviewContent: 'I have been training with this coach for a few months, and the progress i have made is incredible. Really tailored my workouts to my personal goals!' },
    { id: 7, userName: 'Laura Green', image: review1, stars: 5, reviewTitle: 'Transformative Experience', reviewContent: 'I have seen incredible results in just a few weeks! The trainer listens to my goals and provides personalized support. I feel stronger and more confident.' },
    { id: 8, userName: 'David Brown', image: review2, stars: 5, reviewTitle: 'Exceeded My Expectations', reviewContent: 'The trainer went above and beyond! They really helped me improve my form, and I have seen noticeable results faster than I imagined.' },
    { id: 9, userName: 'Olivia Wilson', image: review3, stars: 5, reviewTitle: 'Highly Recommend!', reviewContent: 'Such a great experience! The training was challenging, but also fun. I felt supported throughout the whole journey and I am loving the results.' },
];




function Coaches() {

    const handleClick = () => {
        alert('working')
    }

    const filledStars = Math.floor(reviews.stars)
    const emptyStart = 5 - filledStars;

    const renderStars = () => {
        let starArray = [];

        for (let i = 0; i < filledStars; i++) {
            starArray.push(<Icon key={`filled-${i}`} icon="ph:star-fill" className='w-5 h-5 text-yellow-500' />)
        }
        for (let i = 0; i < emptyStart; i++) {
            starArray.push(<Icon key={`empty-${i}`} icon="ph:star-fill" className='w-5 h-5 text-gray-500' />)
        }

        return starArray;
    }

    return (
        <>
            <section
                className='w-full h-full border-solid flex flex-col gap-12 justify-center items-center relative bg-background/40  px-1 sm:px-6 lg:px-12 py-10 lg:py-20'
            >
                <motion.h2
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.2, 0.5)}
                    className="text-4xl sm:text-5xl lg:text-6xl  font-bold tracking-wide fade_appear text-center">
                    They Trust Us
                </motion.h2>
                <div
                    className='absolute top-0 left-0 w-full h-full'
                    style={{
                        backgroundImage: `url(${banner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // opacity: 0.5,
                        zIndex: -1,
                    }}
                />



                {/* ----------------------- */}
                <div className=" my-auto flex w-full max-w-[1640px] flex-col items-start gap-2 scrollbar-hide overflow-hidden ">
                    <ScrollShadow
                        className="-mx-6 -my-5 flex w-full max-w-full snap-x justify-start gap-6 px-6 py-5 "
                        orientation=""
                        size={20}
                    >
                        {reviews.map((product) => (
                            // <ReviewListItem key={product.id} {...product} className="snap-start kkk" />
                            <div key={product.id} className=" dark:text-light rounded-lg shadow-lg p-1 w-[460px] h-52 flex flex-col gap-2 items-center bg-gradient-to-r from-primary via-primary to-cyan-400 bg-[length:400%_400%] animate-revolve ">
                                <div className='bg-light text-background dark:bg-background dark:text-light h-full   hover:scale-105 w-full rounded-lg p-4  transition ease-in-out duration-300 flex flex-col justify-between'>
                                    <div className='flex justify-between items-center w-80'>
                                        <div className=''>
                                            <span className='flex gap-2 '>
                                                <LazyLoadImage src={product.image} alt={product.userName} className="w-[52px] rounded-full aspect-square object-cover cursor-pointer" />
                                                <span className='flex flex-col gap-1'>
                                                    <p className="">{product.userName}</p>
                                                    <p className='text-xs'>20, Jan 2025</p>
                                                </span>
                                            </span>
                                        </div>
                                        <div className='flex gap-0'>
                                            {renderStars()}
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p className="text-sm"><strong>{product.reviewTitle}</strong></p>
                                        <p className="text-sm">{product.reviewContent}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ScrollShadow>
                </div>

            </section>

        </>
    )
}

export default Coaches