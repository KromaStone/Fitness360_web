import { motion } from 'framer-motion'
import React from 'react'
import { fadeIn } from '../assets/utils/motion'
import TrainerCard from '../client/components/TrainerCard'
import { gymTrainer1, gymTrainer2, gymTrainer3, gymTrainer4 } from '../components/images'
function Trainers() {
  const trainerData = [
    {
      id: 1,
      TrainerName: "John Doe",
      TrainerDescription: "Workout Trainer",
      TrainerImage: gymTrainer1,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app ",
    },
    {
      id: 2,
      TrainerName: "Jane Smith",
      TrainerDescription: "Yoga Instructor",
      TrainerImage: gymTrainer2,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app",
    },
    {
      id: 3,
      TrainerName: "Mike Johnson",
      TrainerDescription: "Strength Coach",
      TrainerImage: gymTrainer3,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app",
    },
    {
      id: 4,
      TrainerName: "Emily Davis",
      TrainerDescription: "Pilates Expert",
      TrainerImage: gymTrainer4,
      socialMediaLink1: "https://fitness360.vercel.app",
      socialMediaLink2: "https://fitness360.vercel.app",
      socialMediaLink3: "https://fitness360.vercel.app",
    }
  ]

  return (
    <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background  dark:bg-background dark:text-light">
      <div className='max-w-[1550px] m-auto'>
        <motion.p
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.3, 0.5)}
          className="text-base sm:text-md lg:text-lg text-left w-full justify-start items-center flex gap-2 text-primary uppercase  font-semibold">
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

        <div className="container pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-4 sm:gap-x-8 lg:gap-x-16 xl:gap-x-20 justify-between -mb-8">

            {trainerData.map((trainer, index) => (
              <TrainerCard
                key={index}
                id={trainer.id}
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
      </div>
    </section>

  )
}

export default Trainers