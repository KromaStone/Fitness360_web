import React from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NextButton } from '../../components/NextButton'; // Make sure to adjust the import path
import { fadeIn } from '../../assets/utils/motion';
import check from '../../assets/icons/check.png';
const PlansCard = ({ plans, handleClick }) => {
  return (
    <>
      {plans.map((plan, index) => (
        <motion.div
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("up", "", ((plan.id - 1) / 5), 0)}
          key={index}
          className="text-left flex flex-col border-primary/50 border-1 rounded-xl xs:rounded-2xl my-2 xs:my-3 sm:my-4 py-3 xs:py-4 px-3 xs:px-4 sm:px-5 transition duration-300 ease-in-out bg-gradient-to-tl from-secondlight/40 from-10% via-secondlight/20 to-secondlight/40 dark:from-background dark:to-secondary"
        >
          <p className='text-sm xs:text-base sm:text-lg md:text-xl mb-1 xs:mb-2 opacity-85 font-bold'>
            {plan.name}
          </p>

          <h2 className='text-2xl xs:text-3xl sm:text-4xl font-bold'>
            ${plan.price} <span className="text-xs xs:text-sm font-semibold">/Year</span>
          </h2>

          <p className='mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-md'>
            {plan.description}
          </p>

          <ul className='mt-4 xs:mt-5 sm:mt-6 mb-6 xs:mb-8 sm:mb-10 md:mb-12'>
            {plan.features.map((feature, i) => (
              <li key={i} className='flex items-center my-1 xs:my-1.5 sm:my-2 text-xs xs:text-sm sm:text-md'>
                <LazyLoadImage
                  src={check}
                  alt="check icon"
                  className='mr-1 xs:mr-2 w-3 xs:w-4 h-3 xs:h-4'
                />
                {feature}
              </li>
            ))}
          </ul>

          <NextButton
            onClick={handleClick}
            color=""
            className="text-xs xs:text-sm sm:text-md"
          >
            Join Now
          </NextButton>
        </motion.div>
      ))}
    </>
  );
};

export default PlansCard;