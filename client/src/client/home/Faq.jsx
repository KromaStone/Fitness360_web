import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { fadeIn } from '../../assets/utils/motion';

function Faq({
    title = "Frequently asked questions",
    description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ipsa deleniti, ipsum saepe earum obcaecati praesentium officiis maxime hic ullam.",
    questions = [
        {
            id: "1",
            question: "What kind of workouts are available on the app?",
            answer: "Our app offers a wide variety of workouts including strength training, cardio, yoga, HIIT, and more. All workouts are designed by certified trainers."
        },
        {
            id: "2",
            question: "Can I track my progress and set fitness goals?",
            answer: "Yes, you can track your workouts, nutrition, and body measurements. Our app allows you to set personalized fitness goals and monitors your progress."
        },
        {
            id: "3",
            question: "Is there a subscription or membership fee for using the app?",
            answer: "We offer both free and premium versions. The premium version unlocks all features with a monthly or annual subscription."
        },
        {
            id: "4",
            question: "Can I customize my workout plans based on my fitness level or goals?",
            answer: "Absolutely! Our app creates personalized workout plans based on your fitness level, goals, available equipment, and time commitment."
        }
    ]
}) {
    return (
        <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 text-background bg-light dark:bg-background dark:text-light">
            <div className='flex flex-col md:flex-row max-w-[1550px] m-auto'>
                <div className='w-full md:w-5/12'>
                    <motion.h2
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.2, 0.5)}
                        className='text-xl sm:text-2xl lg:text-3xl font-black text-left'
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("", "", 0.3, 0.5)}
                        className='text-sm sm:text-lg lg:text-xl my-2 sm:my-4 c-text-gray text-left text-secondary/90 dark:text-secondlight/90'
                    >
                        {description}
                    </motion.p>
                </div>

                <motion.div
                    whileInView="show"
                    initial="hidden"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={fadeIn("", "", 0.2, 0.5)}
                    className='w-full lg:w-7/12'
                >
                    <Accordion variant="bordered">
                        {questions.map((item) => (
                            <AccordionItem
                                key={item.id}
                                aria-label={`Q ${item.id}`}
                                title={item.question}
                                className="text-left"
                            >
                                <span className='text-secondary/70 dark:text-light/60'>
                                    {item.answer}
                                </span>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section >
    );
}

export default Faq;