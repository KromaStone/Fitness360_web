import React from 'react'
import { motion } from 'framer-motion'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { fadeIn } from '../../assets/utils/motion';

function Faq() {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <>
            <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 text-background bg-light dark:bg-background dark:text-light">
                <div className='flex flex-col md:flex-row max-w-[1550px] m-auto'>
                    <div className='w-full md:w-5/12'>
                        <motion.h2
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("up", "", 0.2, 0.5)}
                            className='text-xl sm:text-2xl lg:text-3xl font-black  text-left'>Frequently asked questions</motion.h2>
                        <motion.p
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("up", "", 0.3, 0.5)} className='text-sm sm:text-lg lg:text-xl my-2 sm:my-4 c-text-gray text-left text-secondary dark:text-secondlight'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ipsa deleniti, ipsum saepe earum obcaecati praesentium officiis maxime hic ullam.
                        </motion.p>
                    </div>


                    <Accordion variant="bordered" className='w-full md:w-7/12'>
                        <AccordionItem key="1" aria-label="Q 1" title="What kind of workouts are available on the app?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Q 2" title="Can I track my progress and set fitness goals?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Q 3" title="Is there a subscription or membership fee for using the app?">
                            {defaultContent}
                        </AccordionItem>
                        <AccordionItem key="4" aria-label="Q 4" title="Can I customize my workout plans based on my fitness level or goals?">
                            {defaultContent}
                        </AccordionItem>
                    </Accordion>

                </div>

            </section >



        </>
    )
}

export default Faq