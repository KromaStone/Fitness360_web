/* eslint-disable no-unused-vars */
// import React from 'react'
import { Card, CardFooter, Image, } from "@nextui-org/react";
import { fadeIn } from "../assets/utils/motion";
import { motion } from "framer-motion";
import { facebookIcon, instagramIcon, twitterIcon } from "../components/icons";
import { trainer4, } from "../components/images";
import { useEffect, useState } from "react";
import { knowAllTrainers } from "../services/homeService/HomeService";
import Loader from "../components/Loader";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useLocation } from 'react-router-dom'
function Trainers() {

  const [trainersData, setTrainersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/trainers') {
      document.title = 'Trainers | Fitness360';
    }
    fetchTrainers(page);
  }, [page]);

  const fetchTrainers = async (page) => {
    try {
      setLoading(true);
      const { trainerData, totalPages } = await knowAllTrainers(page, pageSize);
      setTrainersData(trainerData);
      setTotalPages(totalPages);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };


  const updatePageData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setCurrentPageData(data.slice(startIndex, endIndex));
  };

  const handlePageChange = (action) => {
    setTrainersData([]);
    let newPage = action === "next" ? page + 1 : page - 1;
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      updatePageData(trainersData, newPage);
    }
  };


  const onSmClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <section className="w-full h-full border-solid text-center px-6 sm:px-12 lg:px-24 py-10 lg:py-20 text-background bg-light dark:bg-background dark:text-light">
        <motion.h2
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("up", "", 0.2, 0.5)}
          className='text-4xl sm:text-5xl lg:text-6xl font-black text-center'>Meet Out Trainers</motion.h2>
        <motion.p
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("up", "", 0.3, 0.5)} className='text-lg sm:text-xl lg:text-2xl m-5 sm:m-10 c-text-gray text-center text-secondary dark:text-secondlight'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ipsa deleniti, ipsum saepe earum obcaecati praesentium officiis maxime hic ullam.
        </motion.p>

        {loading === true ?
          // <Loader />
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] auto-rows-min plcai">
            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("up", "", 0.1, 0.5)}
            >

              <Card isFooterBlurred className="shine-effect border-none border-2 border-yellow-400  h-56 bg-background/20 dark:bg-secondlight/20 dark:shadow-none mb-6 " radius="lg">
                <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 justify-between">
                  <p className="text-tiny left-0 text-white/80 text-left">

                  </p>

                  <p
                    className="text-tiny text-white bg-background/20 flex gap-1 p-1 rounded-full"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    <p className="text-tiny text-white hover:cursor-pointer bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />

                  </p>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("up", "", 0.2, 0.5)}
            >

              <Card isFooterBlurred className="shine-effect border-none border-2 border-yellow-400  h-56 bg-background/20 dark:bg-secondlight/20 dark:shadow-none mb-6 " radius="lg">
                <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 justify-between">
                  <p className="text-tiny left-0 text-white/80 text-left">

                  </p>

                  <p
                    className="text-tiny text-white bg-background/20 flex gap-1 p-1 rounded-full"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />

                  </p>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("up", "", 0.3, 0.5)}
            >

              <Card isFooterBlurred className="shine-effect border-none border-2 border-yellow-400  h-56 bg-background/20 dark:bg-secondlight/20 dark:shadow-none mb-6 " radius="lg">
                <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 justify-between">
                  <p className="text-tiny left-0 text-white/80 text-left">

                  </p>

                  <p
                    className="text-tiny text-white bg-background/20 flex gap-1 p-1 rounded-full"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />

                  </p>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("up", "", 0.4, 0.5)}
            >

              <Card isFooterBlurred className="shine-effect border-none border-2 border-yellow-400  h-56 bg-background/20 dark:bg-secondlight/20 dark:shadow-none mb-6 " radius="lg">
                <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 justify-between">
                  <p className="text-tiny left-0 text-white/80 text-left">

                  </p>

                  <p
                    className="text-tiny text-white bg-background/20 flex gap-1 p-1 rounded-full"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />

                  </p>
                </CardFooter>
              </Card>
            </motion.div>
            <motion.div
              whileInView="show"
              initial="hidden"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeIn("up", "", 0.5, 0.5)}
            >

              <Card isFooterBlurred className="shine-effect border-none border-2 border-yellow-400  h-56 bg-background/20 dark:bg-secondlight/20 dark:shadow-none mb-6 " radius="lg">
                <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 justify-between">
                  <p className="text-tiny left-0 text-white/80 text-left">

                  </p>

                  <p
                    className="text-tiny text-white bg-background/20 flex gap-1 p-1 rounded-full"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />
                    <p className="text-tiny text-white bg-secondary/20 rounded-full w-10 h-10 transition ease-in-out duration-800"
                      color="default"
                      radius="lg"
                      size="sm" />

                  </p>
                </CardFooter>
              </Card>
            </motion.div>


          </div>
          :
          <motion.div
            whileInView="show"
            initial="hidden"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeIn("up", "", 0.6, 0.5)} className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] auto-rows-min plcai">

            {trainersData.map((trainer, index) => (
              <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("up", "", index * 0.1, 0.5)}
                key={index}
              >
                <Card isFooterBlurred className="border-none w-fit  h-56 bg-background dark:bg-secondlight/40 dark:shadow-none mb-6 " radius="lg">
                  <Image
                    alt="Woman listing to music"
                    className="object-cover w-full "
                    src={trainer.image || trainer4}
                  />
                  <CardFooter className=" before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 justify-between">
                    <p className="text-tiny left-0 text-white/80 text-left">
                      <span className="block text-base">{trainer.firstName + " " + trainer.lastName}</span>
                      <span>{trainer.serviceType}</span>
                    </p>

                    <p
                      className="text-tiny text-white bg-background/40 flex gap-1 p-1 rounded-full"
                      color="default"
                      radius="lg"
                      size="sm"
                    >
                      <LazyLoadImage src={instagramIcon} className="text-tiny text-white hover:cursor-pointer bg-secondary hover:bg-primary p-1 rounded-full transition ease-in-out duration-800"
                        color="default"
                        radius="lg"
                        size="sm"
                        onClick={() => onSmClick(trainer.instaId)} />
                      <LazyLoadImage src={twitterIcon} className="text-tiny text-white hover:cursor-pointer bg-secondary hover:bg-primary p-1 rounded-full transition ease-in-out duration-800"
                        color="default"
                        radius="lg"
                        size="sm"
                        onClick={() => onSmClick(trainer.twitter)} />
                      <LazyLoadImage src={facebookIcon} className="text-tiny text-white hover:cursor-pointer bg-secondary hover:bg-primary p-1 rounded-full transition ease-in-out duration-800"
                        color="default"
                        radius="lg"
                        size="sm"
                        onClick={() => onSmClick(trainer.facebook)} />
                    </p>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        }
        <div className="pagination-controls text-light flex justify-end">
          <div className="text-white bg-background/40 flex gap-1 rounded-full p-2 dark:bg-secondlight/50">
            <button onClick={() => handlePageChange("back")} disabled={page === 1} className={`bg-secondary py-1 rounded-full px-4 border-[1px] border-secondary hover:border-secondlight transition ease-in-out duration-400 ${page === totalPages ? "hover:border-secondary" : ""}`} >
              Back
            </button>
            <button onClick={() => handlePageChange("next")} disabled={page === totalPages} className={`bg-secondary py-1 rounded-full px-4 border-[1px] border-secondary hover:border-secondlight transition ease-in-out duration-400 ${page === totalPages ? "hover:border-secondary" : ""}`}>
              See More
            </button>
          </div>

        </div>

      </section >
    </>
  )
}

export default Trainers
