import { motion } from 'framer-motion';
import { fadeIn } from '../../assets/utils/motion';
import { useRef, useState } from 'react';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { NextButton } from '../../components/NextButton';

function Bmi() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('male');
    const [activityFactor, setActivityFactor] = useState('1.2');
    const [bmi, setBmi] = useState(null);
    const [weightStatus, setWeightStatus] = useState('');
    const bmiResult = useRef()

    const calculateBmi = () => {
        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmiValue);

        if (bmiValue < 18.5) {
            setWeightStatus('Underweight');
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            setWeightStatus('Healthy');
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            setWeightStatus('Overweight');
        } else {
            setWeightStatus('Obese');
        }
        bmiResult.current.focus();
    };

    const resetCalculator = () => {
        setWeight('');
        setHeight('');
        setAge('');
        setSex('male');
        setActivityFactor('1.2');
        setBmi(null);
        setWeightStatus('');
    };
    return (
        <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 py-10 lg:py-20 bg-light text-background dark:bg-background dark:text-light sm:gap-4 relative overflow-hidden">
            <div className='max-w-[1440px] m-auto'>
                {/* sm:px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10 */}
                {/* sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10 */}
                <div className='flex flex-col md:flex-row justify-between items-start gap-5 w-full'>
                    <div className="w-full flex flex-col gap-1 md:gap-2 lg:gap-2 xl:gap-3 sm:pr-2 md:pr-4 lg:pxr-6 xl:pxr-8 2xl:pxr-10  dark:border-light/30 rounded-xl">
                        <motion.p
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.3, 0.5)}
                            className="text-base sm:text-md lg:text-lg text-left w-full justify-start items-center flex gap-2 text-primary uppercase font-semibold">
                            <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
                            BODY MASS INDEX
                        </motion.p>
                        <motion.h2
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.2, 0.5)}
                            className="text-xl sm:text-2xl md:3xl lg:text-4xl xl:5xl font-bold tracking-wide fade_appear text-left w-full">
                            Calculate Your BMI
                        </motion.h2>
                        <motion.p className="text-xs sm:text-base lg:text-md text-left w-full justify-start items-center flex gap-2 text-secondary dark:text-secondlight font-semibold">
                            Overrides on hanging fruits to identify ball park value added activity to beta overrided the digitals divided with additionals clickthroughs from line.
                        </motion.p>

                        <div className='flex flex-col gap-4 sm:pt-1 md:pt-2 lg:pt-3 xl:pt-4 2xl:pt-5'>
                            <div className='flex justify-center gap-3'>
                                <Input
                                    id='weight'
                                    type="number"
                                    label="Weight (KG)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    variant="bordered"
                                    name='weight'
                                />
                                <Input
                                    type="number"
                                    label="Height (CM)"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    variant="bordered"
                                />
                            </div>
                            <div className='flex justify-center gap-3'>
                                <Input
                                    type="number"
                                    label="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    variant="bordered"
                                />
                                <Select
                                    label="Sex"
                                    selectedKeys={[sex]}
                                    onChange={(e) => setSex(e.target.value)}
                                    variant="bordered"
                                >
                                    <SelectItem key="male" value="male">Male</SelectItem>
                                    <SelectItem key="female" value="female">Female</SelectItem>
                                </Select>
                            </div>

                            <Select
                                label="Activity Factor"
                                selectedKeys={[activityFactor]}
                                onChange={(e) => setActivityFactor(e.target.value)}
                                variant="bordered"
                            >
                                <SelectItem key="1.2" value="1.2">Sedentary</SelectItem>
                                <SelectItem key="1.375" value="1.375">Lightly Active</SelectItem>
                                <SelectItem key="1.55" value="1.55">Moderately Active</SelectItem>
                                <SelectItem key="1.725" value="1.725">Very Active</SelectItem>
                                <SelectItem key="1.9" value="1.9">Extra Active</SelectItem>
                            </Select>
                            <div className="flex gap-2 sm:pt-1 md:pt-[2px] lg:pt-[4px] xl:pt-[6px] 2xl:pt-2">
                                <NextButton
                                    onClick={calculateBmi}
                                    color="primary"
                                    className="flex-1 py-6"
                                >
                                    CALCULATE NOW
                                </NextButton>
                                <NextButton
                                    onClick={resetCalculator}
                                    color="secondary"
                                    className="flex-1 py-6"
                                >
                                    RESET
                                </NextButton>
                            </div>
                        </div>
                    </div>
                    <div className="bg-secondlight/40 dark:bg-secondary/60 p-4 sm:p-2 md:p-4 lg:p-6 xl:p-8 2xl:p-10 rounded-xl w-full">
                        <motion.h2
                            title='Calculate Your BMI'
                            whileInView="show"
                            initial="hidden"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={fadeIn("", "", 0.2, 0.5)}
                            className="text-xl sm:text-2xl md:3xl lg:text-4xl xl:5xl font-bold tracking-wide fade_appear text-left w-full mb-4">
                            {/* <Tooltip content="I am a tooltip"> */}
                            BMI CHART
                            {/* </Tooltip> */}
                        </motion.h2>
                        <div className="flex justify-between text-lg sm:text-xl md:2xl lg:text-3xl xl:4xl font-semibold ">
                            <span className='border-r border-b dark:border-light/20 w-full text-left pl-0 p-3 pt-0'>BMI</span>
                            <span className='border-l border-b dark:border-light/20 w-full p-3 pt-0'>Weight Status</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='border border-l-0 dark:border-light/20 w-full text-left pl-0 p-3'>Below 18.5</span>
                            <span className='border border-r-0 dark:border-light/20 w-full p-3'>Underweight</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='border border-l-0 dark:border-light/20 w-full text-left pl-0 p-3'>18.5 - 24.9</span>
                            <span className='border border-r-0 dark:border-light/20 w-full p-3'>Healthy</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='border border-l-0 dark:border-light/20 w-full text-left pl-0 p-3'>25.0 - 29.9</span>
                            <span className='border border-r-0 dark:border-light/20 w-full p-3'>Overweight</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='border border-l-0 border-b-0 dark:border-light/20 w-full text-left pl-0 p-3 pb-0'>30.0 and Above</span>
                            <span className='border border-r-0 border-b-0 dark:border-light/20 w-full p-3 pb-0'>Obese</span>
                        </div>
                        <p className='mt-5 mb-1 text-xs sm:text-base lg:text-md text-left w-full justify-start items-center'>BMR metabolic rate / BMI body mass index</p>
                        {/* {bmi && ( */}
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">
                                Your BMI:&nbsp;&nbsp;
                                {bmi === null ?
                                    <label htmlFor='weight' className='font-normal italic hover:underline hover:text-primary transition-all ease-in-out duration-300'>calcualte</label>
                                    :
                                    bmi
                                }
                            </h3>
                            {bmi == 'NaN' || bmi === 0 || bmi === null ?
                                `` :
                                <>
                                    <p className={`${bmi ? 'text-md ' : 'text-light dark:text-background'}`}> {weightStatus}</p>
                                    <input
                                        type="text"
                                        ref={bmiResult}
                                        placeholder="lll"
                                        readOnly
                                        className='bg-transparent text-background dark:text-light p-1'
                                        value={`Status :  ${weightStatus}`}
                                    />

                                </>
                            }
                        </div>
                        {/* )} */}
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Bmi;