import { motion } from 'framer-motion'
import React from 'react'
import { fadeIn } from '../assets/utils/motion'
import TrainerCard from '../client/components/TrainerCard'
import { gymTrainer1, gymTrainer2, gymTrainer3, gymTrainer4 } from '../components/images'
function Trainers() {
  const trainerData = [
    {
      TrainerName: "John Doe",
      TrainerDescription: "Workout Trainer",
      TrainerImage: gymTrainer1,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app ",
    },
    {
      TrainerName: "Jane Smith",
      TrainerDescription: "Yoga Instructor",
      TrainerImage: gymTrainer2,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app",
    },
    {
      TrainerName: "Mike Johnson",
      TrainerDescription: "Strength Coach",
      TrainerImage: gymTrainer3,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app",
    },
    {
      TrainerName: "Emily Davis",
      TrainerDescription: "Pilates Expert",
      TrainerImage: gymTrainer4,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app",
    }
  ]

  return (
    <section className="py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 xl:px-52 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center">
      <motion.p
        whileInView="show"
        initial="hidden"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn("", "", 0.3, 0.5)}
        className="text-base sm:text-md lg:text-lg text-left w-full justify-start items-center flex gap-2 text-secondary dark:text-secondlight uppercase  font-semibold">
        our trainers <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
      </motion.p>
      <motion.h2
        whileInView="show"
        initial="hidden"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeIn("", "", 0.2, 0.5)}
        className="mt-2 text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-left w-full ">
        Meet Our Skilled Trainer
      </motion.h2>


      <div className="container mx-auto p-4 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 sm:gap-x-8 lg:gap-x-16 xl:gap-x-20">

          {trainerData.map((trainer, index) => (
            <TrainerCard
              key={index}
              TrainerName={trainer.TrainerName}
              TrainerDescription={trainer.TrainerDescription}
              TrainerImage={trainer.TrainerImage}
              socialMediaLink1={trainer.socialMediaLink1}
              socialMediaLink2={trainer.socialMediaLink2}
              socialMediaLink3={trainer.socialMediaLink3}
            />
          ))}
        </div>

      </div>

    </section>

  )
}

export default Trainers