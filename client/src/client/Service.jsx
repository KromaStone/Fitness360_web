// import React from 'react'
import { motion } from "framer-motion";
import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from "../assets/utils/motion";
import { NextButton } from '../components/NextButton';
import { serviceBg1, serviceBg2 } from "../components/images";
function Service() {
  useEffect(() => {
    document.title = 'Services | Fitness360'
  }, [])

  const navigate = useNavigate()
  const shopClick = () => {
    navigate('/shop')
  }
  const aboutClick = () => {
    navigate('/about')
  }
  return (
    <>
      <section className="bg-background text-light flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 py-20">
        <motion.div
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("left", "", 0.3, 0.5)}
          className=" font-bold tracking-wide w-full lg:w-[45%]  pl-0 md:pl-16 lg:pl-32 text-center md:text-left"
        >
          <h2 className="uppercase text-3xl  md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-none font-black">
            <span className="block">Get the</span>
            <span className="block">right gym</span>
            <span className="block">for your</span>
            <span className="block">home</span>
            <div className="p-[1px] flex border-1 border-primary w-fit mt-8 mx-auto md:mx-0">
              <NextButton className="text-sm md:text-base lg:text-lg xl:text-lg 
             py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6
             px-2 sm:px-3 md:px-4 lg:px-5 xl:px-8
              rounded-none hover:bg-transparent" onClick={shopClick}>SHOP NOW</NextButton>
            </div>
          </h2>
        </motion.div>

        <motion.div
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.3, 0.5)}
          className=" text-secondlight w-full lg:w-[55%] h-[90%] hidden md:block"
        >
          <LazyLoadImage src={serviceBg1} alt="Background Image" className="w-full h-full object-cover hidden md:block" />
        </motion.div>
      </section>


      {/* Cardio  */}
      <section className="bg-secondary text-light flex flex-col md:flex-row justify-center items-center gap-4 py-20">
        {/* Left Column (Image) */}
        <motion.div
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.3, 0.5)}
          className="text-base sm:text-lg lg:text-xl text-right text-secondlight w-full md:w-[60%] h-[90%]"
        >
          <LazyLoadImage src={serviceBg2} alt="Cardio Equipment Image" className="h-full object-cover hidden md:block" />
        </motion.div>

        {/* Right Column (Text + CTA) */}
        <motion.div
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.3, 0.5)}
          className="font-bold tracking-wide w-full md:w-[40%] pr-1  md:pr-4"
        >
          <h2 className="uppercase sm:text-2xl lg:text-4xl text-primary text-center md:text-left text-4xl leading-none font-black">
            <span className="block">Cardio</span>
            <span className="block">equipment</span>
            <span className="block">for the home gym</span>
            <span className="block">or studio.</span>
          </h2>
          <p className="mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-5 text-sm sm:text-base md:text-base text-secondlight hidden lg:block">
            Discover our top-of-the-line cardio equipment designed for home gyms and studios. Whether you're a beginner or an experienced fitness enthusiast, we offer the best in class to help you achieve your fitness goals. Choose quality, durability, and innovation—choose us for your home gym setup.
          </p>

          {/* CTA Button */}
          <div className="p-[1px] flex border-1 border-primary w-fit mt-4 mx-auto md:mx-0">
            <NextButton className="text-sm md:text-base lg:text-lg xl:text-lg 
             py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6
             px-2 sm:px-3 md:px-4 lg:px-5 xl:px-8
              rounded-none hover:bg-transparent" onClick={shopClick}>SHOP NOW</NextButton>
          </div>
        </motion.div>
      </section>




      <section className="w-full h-full border-solid text-center 
      px-2 sm:px-20 lg:px-40 xl:px-64
      py-4 sm:py-8 lg:py-16 xl:py-20
       bg-background">
        <div className="flex flex-col md:flex-row gap-3 md:gap-0  max-w-[1550px] m-auto">

          <div className="w-full md:w-1/2 bg-secondary p-4 lg:p-8 xl:p-12 pr-10 sm:pr-16 lg:pr-32 flex flex-col justify-between">
            <motion.h2
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("up", "", 0.2, 0.5)}
              className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl  font-black text-left text-primary '>A1 Elliptical Trainer</motion.h2>
            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("", "", 0.6, 0.5)} className='text-xs sm:text-sm md:text-base lg:text-lg my-1 sm:my-2 md:my-3 lg:my-4 xl:my-5  text-left text-secondlight'>
              <ul className="list-disc font-bold ml-8">
                <li>Feature your package or plan inclusions</li>
                <li>In bullet form</li>
                <li>For easy readability</li>
                <li>Even for people on mobile</li>
              </ul>
            </motion.div>

            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("", "", 0.6, 0.5)} className='text-xs sm:text-sm md:text-base lg:text-lg my-1 sm:my-2 md:my-3 lg:my-4 xl:my-5  text-left text-secondlight'>
              <div className="flex pt-4 sm:pt-6 lg:pt-8 gap-2">
                <NextButton className="text-xs sm:text-sm md:text-base lg:text-lg rounded-none hover:bg-transparent border-1 border-primary" onClick={shopClick}>SHOP NOW</NextButton>
                <NextButton className="text-xs sm:text-sm md:text-base lg:text-lg  px-8 rounded-none border-1 border-light hover:border-primary" color="secondary" onClick={aboutClick}>Full DETAILS</NextButton>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 flex  items-center justify-center bg-green-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d67947.04357262407!2d76.72951406693808!3d30.732347721790592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh!5e1!3m2!1sen!2sin!4v1738035229652!5m2!1sen!2sin"
              width="100%"  // Make the width responsive
              height="450"
              style={{ border: '0' }} // Use object for styles
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="bg-secondary h-[2px]"></section>
    </>
  )
}

export default Service
