

import { Card, CardBody, CircularProgress, Progress } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeIn } from "../../assets/utils/motion";
import { traineeLoader, trainerLoader } from '../../components/icons';
import { trainerCount, workoutCount } from "../../services/adminService/TrainerService";
import { userCount } from "../../services/adminService/userService";


function Dashboard() {
  const [totalUser, setTotalUsers] = useState(0);
  const [totalTrainer, setTotalTrainer] = useState(0);
  const [totalWorkout, setTotalWorkout] = useState(0);
  const maxUsers = totalUser ? totalUser * 1.2 : 1;
  const maxTrainers = totalTrainer ? totalTrainer * 1.2 : 1;

  useEffect(() => {
    document.title = 'Admin Dashboard | Fitness360'
    UserCount();
    TrainerCount();
    WorkoutCount();
  }, []);

  const UserCount = async () => {
    try {
      const totalUsers = await userCount();
      setTotalUsers(totalUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const TrainerCount = async () => {
    try {
      const result = await trainerCount();
      setTotalTrainer(result);
    } catch (error) {
      console.error(error);
    }
  }
  const WorkoutCount = async () => {
    try {
      const result = await workoutCount();
      setTotalWorkout(result.count)
      console.log(totalWorkout)
    } catch (error) {
      console.log(error)
    }
  }

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offsetUser = circumference - (totalUser / maxUsers) * circumference;
  const offsetTrainer = circumference - (totalTrainer / maxTrainers) * circumference;

  return (
    <>
      <div className="flex flex-col gap-5 text-background">
        <div className="flex gap-5">
          {/* trainer  */}
          <div className=" w-2/6 bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between hover:shadow-md hover:bg-green-100 hover:border-green-300 transition ease-in-out duration-300">
            <div className="flex flex-col justify-evenly items-center ">
              <Card className="bg-red-200 bg-transparent shadow-none">
                <CardBody className="justify-center items-center py-0">
                  <div className="relative flex justify-center items-center w-full h-full">

                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-primary",
                        track: "stroke-primary/10",
                      }}
                      value={totalTrainer}
                      strokeWidth={4}
                      showValueLabel={false}
                    />
                    <span className="absolute text-3xl font-semibold dark:text-background">{totalTrainer}</span>
                  </div>
                </CardBody>
              </Card>
              <p className="dark:text-background">Total Trainers: {totalTrainer}</p>
            </div>
            <motion.img
              initial='hidden'
              animate={'show'}
              variants={fadeIn("up", "", 0.6, 0.5)} src={trainerLoader} alt="" className="h-56 aspect-auto hover:cursor-pointer" />
          </div>

          {/* trainee */}
          <div className="w-2/6 bg-green-50 border border-green-200 rounded-xl p-4 flex justify-between hover:shadow-md hover:bg-green-100 hover:border-green-300 transition ease-in-out duration-300">
            <div className="flex flex-col justify-center items-center ">
              <Card className="bg-red-200 bg-transparent shadow-none">
                <CardBody className="justify-center items-center py-0">
                  <div className="relative flex justify-center items-center w-full h-full">

                    <CircularProgress
                      classNames={{
                        svg: "w-36 h-36 drop-shadow-md",
                        indicator: "stroke-primary",
                        track: "stroke-primary/10",
                      }}
                      value={totalUser}
                      strokeWidth={4}
                      showValueLabel={false}
                    />
                    <p className="absolute text-3xl font-semibold dark:text-background">{totalUser}</p>
                  </div>
                </CardBody>
              </Card>
              <p className="dark:text-background">Total Users: {totalUser}</p>
            </div>
            <motion.img
              initial='hidden'
              animate={'show'}
              variants={fadeIn("up", "", 0.6, 0.5)}
              src={traineeLoader} alt="" className="h-56 aspect-auto  hover:cursor-pointer" />
          </div>

          <div className="w-2/6 flex flex-col gap-5">
            <div className="border border-yellow-200 rounded-xl p-4 flex flex-col justify-between h-[50%] dark:text-light">
              <Progress className="max-w-md" size="lg" value={totalWorkout} />
              <p>Total Workouts: {totalWorkout}
              </p>
            </div>
            <div className=" bg-blue-50 border border-blue-200 rounded-xl p-4 flex justify-between h-[50%] dark:text-light">
              {/* <Card className="w-[240px] h-[240px] bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <CardBody className="justify-center items-center py-0">
                  <CircularProgress
                    classNames={{
                      svg: "w-36 h-36 drop-shadow-md",
                      indicator: "stroke-white",
                      track: "stroke-white/10",
                      value: "text-3xl font-semibold text-white",
                    }}
                    value={70}
                    strokeWidth={4}
                    showValueLabel={true}
                  />
                </CardBody>
              </Card> */}
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex justify-between text-backgroun">
          section 2
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex justify-between text-backgroun">
          section 3
        </div>


      </div>
    </>
  );
}

export default Dashboard;
