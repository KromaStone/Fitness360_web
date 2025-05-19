import React from 'react'
import { cocoCompany, coffeeCompany, gym1Company, gym2Company, leafCompany, mixlrCompany, treeCompany, trainer4, trainer5 } from '../../components/images';
import { fadeIn } from '../../assets/utils/motion';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CompaniesMarquee() {
    const companies = [
        {
            CompanyName: 'groot',
            description: "A gymnast boom bam",
            image: cocoCompany,
        },
        {
            CompanyName: 'TechNova',
            description: "Innovative tech solutions for the future",
            image: treeCompany,
        },
        {
            CompanyName: 'GreenLeaf',
            description: "Sustainable energy and green technologies",
            image: leafCompany,
        },
        {
            CompanyName: 'groot',
            description: "A gymnast boom bam",
            image: coffeeCompany,
        },
        {
            CompanyName: 'groot',
            description: "A gymnast boom bam",
            image: mixlrCompany,
        },
        {
            CompanyName: 'TechNova',
            description: "Innovative tech solutions for the future",
            image: gym1Company,
        },
        {
            CompanyName: 'GreenLeaf',
            description: "Sustainable energy and green technologies",
            image: gym2Company,
        },
        {
            CompanyName: 'groot',
            description: "A gymnast boom bam",
            image: cocoCompany,
        },
        {
            CompanyName: 'TechNova',
            description: "Innovative tech solutions for the future",
            image: treeCompany,
        },
        {
            CompanyName: 'GreenLeaf',
            description: "Sustainable energy and green technologies",
            image: leafCompany,
        },
        {
            CompanyName: 'groot',
            description: "A gymnast boom bam",
            image: coffeeCompany,
        },
        {
            CompanyName: 'groot',
            description: "A gymnast boom bam",
            image: mixlrCompany,
        },
        {
            CompanyName: 'TechNova',
            description: "Innovative tech solutions for the future",
            image: gym1Company,
        },
        {
            CompanyName: 'GreenLeaf',
            description: "Sustainable energy and green technologies",
            image: gym2Company,
        },
    ];
    return (
        <section className="py-1 sm:py-2 md:py-2 lg:py-4 xl:py-6 bg-secondlight dark:bg-secondary overflow-hidden relative">
            <div className='h-[-webkit-fill-available] w-1/12 right-0 top-0 absolute z-20 bg-gradient-to-l from-secondlight dark:from-background to-transparent'></div>
            <div className='h-[-webkit-fill-available] w-1/12 left-0 top-0 absolute z-20 bg-gradient-to-r from-secondlight dark:from-background to-transparent'></div>
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("left", "", 0.4, 1)}
                className="marquee-container relative ">
                <div className="marquee-content flex gap-16 animate-marquee">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="w-auto h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 flex-shrink-0 cursor-pointer flex items-center justify-center gap-4 hover:grayscale-0 grayscale transition ease-in-out duration-300"
                        >
                            <LazyLoadImage src={company.image} alt="" className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20" />
                            <p className="text-lg sm: md:text-xl lg:text-2xl xl:text-3xl text-background dark:text-light">{company.CompanyName}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
            {/* </div> */}
        </section>
    )
}

export default CompaniesMarquee