import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { fadeIn } from '../assets/utils/motion';
import ArticleCard from './components/ArticleCard';

const dietArticles = [
    {
        id: 1,
        title: "The Mediterranean Diet: A Heart-Healthy Eating Plan",
        description: "Discover how the Mediterranean diet can improve your heart health and overall wellbeing with its focus on whole foods and healthy fats.",
        authorName: "Dr. Sarah Johnson",
        articleDate: "May 15, 2023",
        articleLink: "#",
        articleImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80"
    },
    {
        id: 2,
        title: "Plant-Based Nutrition: Getting All Your Essential Nutrients",
        description: "Learn how to get complete nutrition from plant-based sources and maintain optimal health without animal products.",
        authorName: "Nutritionist Mark Lee",
        articleDate: "June 2, 2023",
        articleLink: "#",
        articleImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
    },
    {
        id: 3,
        title: "Meal Prep 101: Saving Time and Eating Healthy",
        description: "Simple strategies for meal prepping that will save you time during the week while keeping your diet on track.",
        authorName: "Chef Emily Wilson",
        articleDate: "April 28, 2023",
        articleLink: "#",
        articleImage: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
    }
];

const mealPlans = [
    {
        day: "Monday",
        meals: {
            breakfast: "Oatmeal with berries and nuts",
            lunch: "Quinoa salad with chickpeas and vegetables",
            dinner: "Grilled salmon with roasted vegetables"
        }
    },
    {
        day: "Tuesday",
        meals: {
            breakfast: "Greek yogurt with honey and granola",
            lunch: "Lentil soup with whole grain bread",
            dinner: "Stir-fried tofu with brown rice"
        }
    },
    {
        day: "Wednesday",
        meals: {
            breakfast: "Avocado toast with poached eggs",
            lunch: "Grilled chicken wrap with mixed greens",
            dinner: "Vegetable lasagna with side salad"
        }
    }
];

const NUTRITIAL_TIPS = [
    {
        icon: "mdi:water",
        title: "Stay Hydrated",
        description: "Drink at least 8 glasses of water daily to support metabolism and overall health."
    },
    {
        icon: "mdi:fruit-watermelon",
        title: "Eat More Fruits & Veggies",
        description: "Aim for 5-9 servings of colorful fruits and vegetables each day for essential nutrients."
    },
    {
        icon: "mdi:nutrition",
        title: "Balance Macronutrients",
        description: "Include a balance of proteins, healthy fats, and complex carbs in each meal."
    },
    {
        icon: "mdi:food-variant-off",
        title: "Limit Processed Foods",
        description: "Reduce intake of processed foods high in added sugars, salt, and unhealthy fats."
    }
]


const Diet = () => {

    return (
        <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center sm:gap-4">
            <div className='max-w-[1440px] m-auto'>
                <div className='min-h-screen bg-light dark:bg-background py-12 px-4 sm:px-6 lg:px-8'>
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-center mb-16'
                    >
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-background dark:text-light mb-4'>
                            Healthy Eating Made Simple
                        </h1>
                    </motion.div>

                    {/* Featured Articles */}
                    <section className='mb-20'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className='mb-10'
                        >
                            <h2 className='text-2xl md:text-3xl font-bold text-background dark:text-light mb-6 flex items-center gap-2'>
                                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                                Latest Nutrition Articles
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                <ArticleCard articles={dietArticles} />
                            </div>
                        </motion.div>
                    </section>

                    {/* Weekly Meal Plan */}
                    <section className='mb-20'>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className='text-2xl md:text-3xl font-bold text-background dark:text-light mb-6 flex items-center gap-2'>
                                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                                Ideal Weekly Meal Plan
                            </h2>

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                {mealPlans.map((plan, index) => (
                                    <motion.div
                                        key={index}
                                        variants={fadeIn("up", "spring", index * 0.1, 0.5)}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className='hover:bg-secondary-50/30  dark:bg-secondbackground dark:hover:bg-light/5 rounded-xl shadow-primary overflow-hidden border border-secondary/20 dark:border-secondlight/20 transition-all ease-in-out duration-300 cursor-pointer'
                                    >
                                        <div className='p-6'>
                                            <h3 className='text-xl font-bold text-background dark:text-light mb-4'>{plan.day}</h3>
                                            <div className='space-y-4'>
                                                <div>
                                                    <h4 className='text-sm font-semibold text-primary mb-1'>Breakfast</h4>
                                                    <p className='text-background/80 dark:text-secondlight/80'>{plan.meals.breakfast}</p>
                                                </div>
                                                <div>
                                                    <h4 className='text-sm font-semibold text-primary mb-1'>Lunch</h4>
                                                    <p className='text-background/80 dark:text-secondlight/80'>{plan.meals.lunch}</p>
                                                </div>
                                                <div>
                                                    <h4 className='text-sm font-semibold text-primary mb-1'>Dinner</h4>
                                                    <p className='text-background/80 dark:text-secondlight/80'>{plan.meals.dinner}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>

                    {/* Nutrition Tips */}
                    <section className='mb-20'>
                        <div

                        >
                            <h2 className='text-2xl md:text-3xl font-bold text-background dark:text-light mb-6 flex items-center gap-2'>
                                <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                                Essential Nutrition Tips
                            </h2>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                {NUTRITIAL_TIPS.map((tip, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: false }}
                                        transition={{
                                            type: "keyframes",
                                            stiffness: 0,
                                            damping: 0,
                                            delay: index * 0.2,
                                            duration: 0.4,
                                        }}
                                        className='dark:bg-secondbackground hover:bg-primary/5 p-6 rounded-xl border border-secondary/20 dark:border-secondlight/20 transition-all ease-in-out duration-300 cursor-pointer'
                                    >
                                        <div className='text-primary mb-4'>
                                            <Icon icon={tip.icon} width={40} />
                                        </div>
                                        <h3 className='text-lg font-bold text-background dark:text-light mb-2'>{tip.title}</h3>
                                        <p className='text-background/80 dark:text-secondlight/80'>{tip.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='bg-primary/10 dark:bg-primary/20 rounded-xl p-8 md:p-12 text-center'
                    >
                        <h2 className='text-2xl md:text-3xl font-bold text-background dark:text-light mb-4'>
                            Ready to Transform Your Diet?
                        </h2>
                        <p className='text-background/80 dark:text-secondlight/80 mb-6 max-w-2xl mx-auto'>
                            Get personalized meal plans and nutrition guidance tailored to your specific needs and goals.
                        </p>
                        <button className='bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 flex items-center mx-auto'>
                            <span>Get Started</span>
                            <Icon icon="line-md:arrow-right" className="ml-2" width={20} />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Diet;