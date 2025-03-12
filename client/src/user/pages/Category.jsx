import { Card, CardFooter } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fadeIn } from "../../assets/utils/motion";
import { categoryimg1, categoryimg2, categoryimg3, categoryimg4, categoryimg5, categoryimg6, categoryimg7, categoryimg8 } from "../../components/images";
function Category() {
    const navigate = useNavigate()
    const categoryData = [
        {
            image: categoryimg1,
            workOut: 'Cardio',
            workoutValue: 'cardio'

        },
        {
            image: categoryimg2,
            workOut: 'Cross Fit',
            workoutValue: 'crossfit'
        },
        {
            image: categoryimg3,
            workOut: 'Build Muscle',
            workoutValue: 'buildmuscle'
        },
        {
            image: categoryimg4,
            workOut: 'Core Stength',
            workoutValue: 'corestrength'
        },
        {
            image: categoryimg5,
            workOut: 'Abs Workout',
            workoutValue: 'absworkout'
        },
        {
            image: categoryimg6,
            workOut: 'Upper Body',
            workoutValue: 'upperbody'
        },
        {
            image: categoryimg7,
            workOut: 'Aerobics',
            workoutValue: 'aerobics'
        },
        {
            image: categoryimg8,
            workOut: 'Lower Body',
            workoutValue: 'lowerbody'
        },
    ]
    useEffect(() => {
        document.title = 'Category | Fitness360'
    }, [])
    const navigateToWorkout = async (workoutValue) => {
        // navigate('/user/workout')
        sessionStorage.setItem('workoutValue', workoutValue);
        navigate(`/user/workout`);
    }

    return (
        <>
            <h2 className="font-semibold text-xl mb-8">Select a Workout Category</h2>
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("up", "", 0.1, 0.5)} className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(320px,1fr))] ">
                {categoryData.map((trainer, index) => (
                    <motion.div
                        whileInView="show"
                        initial="hidden"
                        viewport={{ once: false, amount: 0.2 }}
                        variants={fadeIn("up", "", index * 0.08, 0.4)}
                        key={index}
                        onClick={() => navigateToWorkout(trainer.workoutValue)}
                    >

                        <Card
                            isFooterBlurred
                            className="border-none w-full h-44 dark:shadow-none mb-6 cursor-pointer hover:scale-[.98]"
                            radius="lg"
                            style={{ backgroundImage: `url(${trainer.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <CardFooter className="before:bg-white/5 border-white/5 overflow-hidden before:rounded-xl rounded-large shadow-small z-10 justify-center py-1 absolute bottom-1 mx-1 border-1 " style={{ width: 'calc(100% - 8px)' }}>

                                <p className="text-base left-0 text-light text-left">
                                    <span className="block text-base">{trainer.workOut}</span>
                                </p>
                            </CardFooter>
                        </Card>

                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}

export default Category