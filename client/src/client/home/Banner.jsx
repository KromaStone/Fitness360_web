import { motion } from "framer-motion";
import bannerBg from '../../assets/videos/bannerBg.mp4'
import { fadeIn } from "../../assets/utils/motion";
import { NextButton } from "../../components/NextButton";
import { useNavigate } from 'react-router-dom'

function Banner() {
    const navigate = useNavigate()

    const lognClick = () => {
        navigate('/login')
    }
    const shopClick = () => {
        navigate('/shop')
    }
    return (
        <>
            <section
                className='w-full h-screen flex flex-col justify-center items-center  p-4 overflow-hidden -mb-[74px]'
                style={{ backgroundColor: bannerBg, backgroundPosition: 'center', }}
            >
                <video
                    autoPlay
                    loop
                    muted
                    className='backdrop-sepia bg-background/90 absolute top-0 left-0 w-full h-full object-cover '
                    style={{ zIndex: -1, objectFit: 'cover' }}
                >
                    <source src={bannerBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <motion.div
                    initial='hidden'
                    animate={'show'}
                    variants={fadeIn("up", "", 0.6, 0.5)}
                    className='relative z-10 w-full pl-1 sm:pl-8 lg:pl-32 xl:pl-52 pb-[74px]'
                >
                    <p className="text-base sm:text-md lg:text-lg  items-center flex gap-2 text-primary uppercase  font-semibold">
                        <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>Keep your body fit with workouts
                    </p>
                    <h1 className='font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] text-left mb-4 text-white uppercase'>
                        Your Fitness<br /> Your Victory
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg mb-4 capitalize">Ready to change your physique, But can't  work out in the gym ?</p>
                    <div className='flex gap-6  items-start   '>
                        <NextButton color="secondary" className="w-full md:w-36 xl:w-44 " onClick={shopClick}>Shop Trend</NextButton>

                        <NextButton type="background" className="w-full   md:w-36 xl:w-44" onClick={lognClick}>Lets Start</NextButton>
                    </div>
                </motion.div>
            </section>
        </>

    )
}

export default Banner