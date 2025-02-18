import workoutImage1 from '../../assets/images/home-img-1.png'
import workoutImage2 from '../../assets/images/home-img-2.png'
import workoutImage3 from '../../assets/images/home-img-3.png'
import glove from '../../assets/icons/glove.png'
import time from '../../assets/icons/time.png'
import dubbel from '../../assets/icons/dumbbel.png'
import moneyBag from '../../assets/icons/money-bag.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion } from "framer-motion";
import { fadeIn } from "../../assets/utils/motion";

const cardData = [
    {
        imgSrc: glove,
        title: "Trainer Qualifications",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
        imgSrc: dubbel,
        title: "Facility Amenities",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
        imgSrc: moneyBag,
        title: "Membership Cost",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
    {
        imgSrc: time,
        title: "Operating Hours",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    },
];

const imageData = [
    { src: workoutImage1, alt: "Workout Image 1", className: "my-6 mb-4 sm:mb-0 rtl_appear" },
    { src: workoutImage2, alt: "Workout Image 2", className: "my-4 mb-4 sm:mb-0 rtl_appear" },
    { src: workoutImage3, alt: "Workout Image 3", className: "my-6 rtl_appear" },
];
function ChooseUs() {
    return (
        <>
            <section className='w-full h-full border-solid text-center px-4 sm:px-12 lg:px-24 py-10 lg:py-20  text-background bg-secondlight dark:bg-secondary dark:text-light'>
                <h2 className='text-4xl sm:text-5xl lg:text-6xl font-black'>Why Choose Us</h2>
                <motion.p
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.25, 0.5)}
                    className='text-lg sm:text-xl lg:text-2xl m-5 lg:m-10 text-secondary dark:text-secondlight'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </motion.p>

                <div className="flex flex-col lg:flex-row items-center">
                    {/* Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 m-0 p-0 box-border w-full lg:w-8/12">
                        {cardData.map((card, index) => (
                            <motion.div
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", index * 0.15, 0.4)}
                                key={index}
                                className="m-4 flex ltr_appear">
                                <div className="mx-4 my-2 p-2 rounded-full h-fit ">
                                    <LazyLoadImage src={card.imgSrc} alt={card.title} className="w-12 aspect-square" />
                                </div>
                                <div className="h-fit">
                                    <h6 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{card.title}</h6>
                                    <div className="text-secondary dark:text-secondlight">{card.description}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Images */}
                    <div
                        className="w-full hidden lg:w-4/12 md:flex flex-col">
                        <div className="m-4 flex flex-col sm:flex-row">
                            <motion.div

                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", .4, 0.4)} className="mx-0 sm:mx-4 w-full sm:w-1/2 ">
                                {imageData.slice(0, 2).map((image, index) => (
                                    <LazyLoadImage
                                        key={index}
                                        src={image.src}
                                        alt={image.alt}
                                        className={`${image.className} rounded-[40px] border  border-background dark:border-light hover:scale-105 transition-all ease-in-out duration-300`}
                                    />
                                ))}
                            </motion.div>
                            <motion.div
                                whileInView="show"
                                initial="hidden"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={fadeIn("", "", .4, 0.4)}
                                className="mx-0 sm:mx-4 w-full sm:w-1/2 mt-4 sm:mt-0">
                                <LazyLoadImage
                                    src={imageData[2].src}
                                    alt={imageData[2].alt}
                                    className={`rounded-[40px] border border-background dark:border-light  group hover:scale-105 transition-all ease-in-out duration-300 ${imageData[2].className} `}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChooseUs