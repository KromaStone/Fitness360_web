import { motion } from 'framer-motion'
import { fadeIn } from '../assets/utils/motion'
function ChooseUs() {
    return (
        <section className=" py-8  sm:py-16 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
            <motion.p
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.3, 0.5)}
                className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-secondary dark:text-secondlight uppercase font-semibold">
                <span className="bg-primary h-[2px] rounded-md w-10 inline-block "></span>why choose us <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
            </motion.p>
            <motion.h2
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.2, 0.5)}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide fade_appear text-center capitalize">
                keep going with your passion
            </motion.h2>


            <div className='w-full border-1 border-green-500 flex flex-col lg:flex-row gap-2 p-2 '>
                <div className='w-full lg:w-1/2 border-1 border-yellow-500 '>1</div>
                <div className='w-full lg:w-1/2 border-1 border-orange-500 '>2</div>
            </div>
        </section>
    )
}

export default ChooseUs