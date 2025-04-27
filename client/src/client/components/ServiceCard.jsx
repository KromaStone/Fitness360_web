import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fadeIn } from '../../assets/utils/motion';
import { trainerCorner } from '../../components/icons';

function ServiceCard({ serviceHeading, servicePara, serviceIcon, serviceLink, id }) {
    return (
        <>
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, }}
                variants={fadeIn("up", "", ((id - 1) / 20), 0)}
                className={`group hover:bg-primary hover:text-light bg-secondlight dark:bg-secondary rounded-3xl flex flex-col gap-3 transition text ease-in-out duration-300 dark:hover:bg-primary mt-4 relative h-full x-[${id}]`}
            >
                <div className="group-hover:bg-background dark:group-hover:bg-light dark:group-hover:text-primary bg-primary dark:bg-light dark:text-background w-16 h-16 rounded-full relative -top-[36px] left-7 -mb-[60px] flex items-center justify-center border-[6px] text-light z-20 border-light dark:border-background transition ease-in-out duration-300"
                >
                    <Icon icon={serviceIcon} width="28" />
                </div>
                <LazyLoadImage src={trainerCorner} alt="" className="w-20 relative -top-4 -mb-[74px]" />
                {/* <div className='polygon_div absolute top-0 left-0 bg-primary w-3 h-4 rounded-tl-3xl rounded-tr-3xl llll'></div> */}

                <h2 className="mx-8 text-2xl font-bold">{serviceHeading}</h2>
                <p className="mx-8 text-background/80 font-medium group-hover:text-light dark:text-light/80">{servicePara}</p>
                <p className="mx-8 xl:mb-8 mb-4 inline-block border-b-1  border-current w-fit cursor-pointer hover:scale-105 text-sm hover:transition hover:ease-in-out hover:duration-300 relative bottom-0 mt-auto">
                    {serviceLink}
                    <Icon icon="si:arrow-right-fill" width="24" height="24" className="inline" />
                </p>
            </motion.div>
        </>
    );
}

export default ServiceCard;