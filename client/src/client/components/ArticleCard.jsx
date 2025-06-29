import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Icon } from '@iconify/react';
import { fadeIn } from '../../assets/utils/motion';
import { motion } from 'framer-motion';
const ArticleCard = ({ articles }) => {
    return (
        <>
            {articles.map((article, index) => (
                <motion.div
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", ((article.id - 1) / 5), (0.2))}
                    className='w-full border-2 dark:border-secondlight/20 border-secondary/20 rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-7 flex flex-col justify-between group'
                    key={index}
                >
                    <div className='h-6 flex justify-left items-center text-secondary/80 dark:text-light/70 text-xs sm:text-md md:text-[14px]'>
                        <p className='p-0 pr-4 flex items-center'>
                            <Icon icon="hugeicons:user" width={16} className='text-primary' />
                            <span className='pl-1'>{article.authorName}</span>
                        </p>
                        <span className='bg-background/70 dark:bg-light/70 w-[2px] h-4'></span>
                        <p className='p-0 pl-4 flex items-center'>
                            <Icon icon="uit:calender" className='text-primary' width={18} />
                            <span className='pl-1'>{article.articleDate}</span>
                        </p>
                    </div>

                    <h2 className="text-left my-2 md:my-3 text-md sm:text-lg md:text-xl xl:text-2xl font-bold">
                        {article.title}
                    </h2>

                    <p className="text-left text-background/80 font-medium dark:text-secondlight/80 text-xs sm:text-md md:text-[14px]">
                        {article.description}
                    </p>

                    <a
                        href={article.articleLink}
                        className='uppercase underline text-primary mt-2 mb-4 flex items-center justify-start gap-2 hover:scale-105 w-fit font-semibold transition-all ease-in-out duration-300 text-xs sm:text-sm md:text-base'
                    >
                        <span>read more</span>
                        <Icon icon="line-md:arrow-right" className='text-primary' width={20} />
                    </a>

                    <LazyLoadImage
                        src={article.articleImage}
                        alt={article.title}
                        className='rounded-xl group-hover:scale-105 transition-all ease-in-out duration-300 aspect-[calc(4*3+1)/8] object-cover'
                    />
                </motion.div>
            ))}
        </>
    );
};

export default ArticleCard;