import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { fadeIn } from "../assets/utils/motion";
import { aboutUsBanner, cocoCompany, coffeeCompany, gym1Company, gym2Company, leafCompany, mixlrCompany, step1, step2, step3, treeCompany, watchVideo } from "../components/images";
import ServiceCard from "./components/ServiceCard";
import Trainers from "./Trainers";

function About() {

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.title = 'About | Fitness360'
  }, [])

  const handlePlayPause = () => {
    const video = document.querySelector('video');
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const stepsData = [
    {
      stepImage: step1,
      stepHeading: "Gym Movement",
      stepData: "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
    },
    {
      stepImage: step2,
      stepHeading: "Fitness Practice",
      stepData: "Gyms are adaptable to various fitness levels and preferences, catering to beginners and advanced individuals alike.",
    },
    {
      stepImage: step3,
      stepHeading: "Achievement",
      stepData: "Group fitness classes led by instructors offer structured workouts in a motivating group setting for development.",
    },
  ];

  const serviceData = [
    {
      serviceHeading: "Workout Videos",
      servicePara: "Access to hundreds of free, full-length workout videos.",
      serviceLink: "Learn More",
      serviceIcon: "token:gymnet",
    },
    {
      serviceHeading: "Nutrition Guides",
      servicePara: "Get personalized nutrition plans and advice.",
      serviceLink: "Discover More",
      serviceIcon: "game-icons:meal",
    },
    {
      serviceHeading: "Training Plans",
      servicePara: "Customized training plans tailored to your goals.",
      serviceLink: "Start Now",
      serviceIcon: "icon-park-solid:gymnastics-one",
    },
    {
      serviceHeading: "Community Support",
      servicePara: "Join a community of like-minded fitness enthusiasts.",
      serviceLink: "Join Now",
      serviceIcon: "fluent:person-support-24-filled",
    }
  ];


  return (
    <>
      {/* banner  */}
      <section className="bg-cover bg-center" >
        <LazyLoadImage src={aboutUsBanner} alt="" className="w-full" />
      </section>

      {/* Work Process steps  */}
      <section className="py-8 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32  xl:px-52 bg-light text-background dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
        <motion.p
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.3, 0.5)}
          className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-secondary dark:text-secondlight  font-semibold"
        >
          <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> Work Process{" "}
          <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
        </motion.p>

        <motion.h2
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.2, 0.5)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide fade_appear text-center"
        >
          Easy Step To Achieve Your Goals.
        </motion.h2>

        <div className="w-full md:flex flex-row justify-between items-center gap-4 mt-2 sm:mt-4 lg:mt-6 xl:mt-8">
          {stepsData.map((step, index) => (
            <div
              key={index}
              className="w-full md:w-4/12 lg:w-4/12 xl:w-3/12 flex flex-row md:flex-col gap-4 items-center justify-center my-4"
            >
              <div className="bg-primary w-[40%] md:w-[70%] rounded-full aspect-square flex items-start justify-center">
                <LazyLoadImage
                  src={step.stepImage}
                  alt={step.stepHeading}
                  className="w-[95%] top-[-4px] relative rounded-full"
                />
              </div>
              <div className="md:text-center">
                <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">{step.stepHeading}</h3>
                <p className="text-xs md:text-sm lg:text-base xl:text-lg font-medium text-secondary/80 dark:text-secondlight/80">{step.stepData}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* video section  */}
      <section className='w-full h-full border-solid text-center px-4 sm:px-12 md:px-28 lg:px-40 xl:px-60 2xl:px-80 py-4 lg:py-8 text-secondary bg-light dark:bg-background dark:text-light flex items-center justify-center'>
        <motion.div
          whileInView="show"
          initial="hidden"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn("", "", 0.2, 0.2)}
          className="w-full h-full flex items-center justify-center rounded-full relative xl:w-10/12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            src={watchVideo}
            className="w-full rounded-xl"
            controls={false}
            onClick={handlePlayPause}
          />
          {!(isPlaying) && isHovered && (
            <button
              className={`absolute flex items-center justify-center text-white text-6xl font-bold cursor-pointer bg-light/50 p-0 hover:p-4 rounded-full border-light/60 border-1 transition-all ease-in-out duration-300 transform hover:scale-110 `}
              onClick={handlePlayPause}
            >
              <Icon
                className="bg-light rounded-full p-3"
                icon="solar:play-bold"
                color="#16b650"
              />
            </button>

          )}

          {isPlaying && isHovered && (
            <button
              className={`absolute flex items-center justify-center text-white text-6xl font-bold cursor-pointer bg-light/50 p-0 hover:p-4 rounded-full border-light/60 border-1 transition-all ease-in-out duration-300 transform hover:scale-110 `}
              onClick={handlePlayPause}
            >
              <Icon
                className="bg-light rounded-full p-3"
                icon="solar:pause-bold"
                color="#16b650"
              />
            </button>
          )}

          {!isPlaying &&
            <motion.p
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("", "", 0.2, 0.2)}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold absolute right-0 top-0 p-2 text-light/60">Watch Video</motion.p>
          }
        </motion.div>
      </section>

      {/* service  */}
      <section className="py-8  sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-32 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
        <motion.p
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.3, 0.5)}
          className="text-base sm:text-md lg:text-lg text-center justify-center items-center flex gap-2 text-secondary dark:text-secondlight uppercase  font-semibold">
          <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span> our servies <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
        </motion.p>
        <motion.h2
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.2, 0.5)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide fade_appear text-center">
          Our Service For You
        </motion.h2>


        <div className="container mx-auto p-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-16 xl:gap-20">
            {serviceData.map((item, index) => (
              <ServiceCard
                key={index}
                serviceHeading={item.serviceHeading}
                servicePara={item.servicePara}
                serviceIcon={item.serviceIcon}
                serviceLink={item.serviceLink}
              />
            ))}
          </div>
        </div>

      </section>


      {/* marquee  */}
      <section className="py-1 sm:py-2 md:py-2 lg:py-4 xl:py-6 px-2 sm:px-10 md:px-18 lg:px-24 xl:px-32 bg-secondlight dark:bg-secondary overflow-hidden">
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
      </section>


      {/* trainers  */}
      <Trainers />





      {/* tertimonials  */}






    </>
  )
}

export default About


