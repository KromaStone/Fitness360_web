import { motion } from 'framer-motion';
import { fadeIn } from '../../assets/utils/motion';
import { trainer5, trainer6, trainer7 } from '../../components/images'; // Assuming other trainer images are imported here
import { useState } from 'react';

// Sample testimonial data
const testimonials = [
    {
        image: trainer5,
        text: `"The Group At Baroque Is Unimaginably Committed, Educated, And Supportive. The Completed Item Was Delightful, And Worth Each Penny. I Would Totally Suggest Baroque"`,
        name: "Alex Carlose",
        company: "ENVATO LLC"
    },
    {
        image: trainer6,
        text: `"Working with Baroque was an amazing experience. The team is top-notch and their commitment to excellence is unmatched. Highly recommended!"`,
        name: "Sarah Lee",
        company: "CREATIVE AGENCY"
    },
    {
        image: trainer7,
        text: `"Absolutely wonderful work! The attention to detail and the passion they put into their craft is evident. I will definitely work with them again."`,
        name: "John Smith",
        company: "WEB DESIGN INC."
    }
];

function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle next and prev button clicks
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    const { image, text, name, company } = testimonials[currentIndex];

    return (
        <section className="py-8 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 xl:px-52 bg-light text-background dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
            <div className="max-w-[1550px] m-auto">
                <motion.p
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn('', '', 0.3, 0.5)}
                    className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-primary uppercase font-semibold"
                >
                    <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>TESTIMONIAL<span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                </motion.p>
                <motion.h2
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn('', '', 0.2, 0.5)}
                    className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-center capitalize mb-2 lg:mb-8"
                >
                    What Our Clients Say?
                </motion.h2>

                <div className="flex md:flex-row flex-col w-full gap-1 sm:gap-2 md:gap-4 lg:gap-8 xl:gap-12 border border-background/30 dark:border-light/40 rounded-[30px] p-2 md:p-4 lg:p-8 xl:p-16 2xl:p-20 overflow-hidden">
                    {/* Card Content */}
                    <motion.div
                        key={currentIndex}
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn('right', '', 0.2, 0.5)}
                        className="w-full h-[160px] md:w-[220px] md:h-[220px] rounded-[30px] md:rounded-full aspect-square "
                        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></motion.div>
                    <div className="flex flex-col gap-6 justify-between">
                        <p className="text-md sm:text-xl md:xl lg:text-xl xl:text-3xl 2xl:text-4xl font-bold tracking-wide fade_appear text-left w-full"
                        >
                            <motion.span
                                key={currentIndex}
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn('up', '', 0.1, 0.5)}
                                className="">{text}</motion.span>
                        </p>
                        <div className="flex justify-between text-md sm:text-lg lg:text-xl xl:text-2xl font-bold">
                            <p >
                                {name},
                                <motion.span
                                    key={currentIndex}
                                    whileInView="show"
                                    initial="hidden"
                                    viewport={{ once: false, amount: 0.2 }}
                                    variants={fadeIn('up', '', 0.05, 0.5)}
                                    className="text-primary">
                                    &nbsp; {company}
                                </motion.span>
                            </p>
                            <p className="flex gap-2">
                                <button onClick={handlePrev} className='border hover:border-primary bg-transparent hover:bg-primary rounded-full p-3 transition-all ease-in-out duration-300'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z" /></svg></button>
                                <button onClick={handleNext} className='border hover:border-primary bg-transparent hover:bg-primary rounded-full p-3 transition-all ease-in-out duration-300'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z" /></svg></button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
