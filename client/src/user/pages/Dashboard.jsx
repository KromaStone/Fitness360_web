import { Icon } from "@iconify/react/dist/iconify.js"
import { Card, CardBody, CardFooter, Image, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react"
import { useEffect, useRef, useState } from "react";
import { useApplicationUser } from "../../utils/ApplicationUserContext";
import { getEnrolledWorkoutData } from "../../services/userServices/EnrollWorkout";

function Dashboard() {


  const [workout, setWorkout] = useState([]);
  const { appUserName, appUserId } = useApplicationUser()
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const { isOpen: isOpenWorkout, onOpen: onOpenWorkout, onClose: onCloesWorkout, onOpenChange: onOpenChangeWorkout } = useDisclosure();

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };


  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  useEffect(() => {
    getEnrolledWorkout(appUserId);
  }, [])


  const getEnrolledWorkout = async (appUserId) => {
    try {
      const result = await getEnrolledWorkoutData(appUserId)
      setWorkout(result.data);
    } catch (e) {
      console.log('error', e)
    }
  }

  const workoutDetails = async (data) => {
    setSelectedWorkout(data)
    onOpenWorkout()
  }


  return (
    <>
      <h2 className="mb-1">Welcome {appUserName}</h2>
      <h2 className="font-semibold text-xl mb-6">Your Enrolled Workout </h2>

      {/* cards  */}
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(450px,1fr))] ">
        {workout.map((data, index) => (
          <Card key={index} isPressable shadow="sm" onPress={() => workoutDetails(data)} className="hover:scale-[.98]">
            <CardBody className="overflow-visible p-0">
              {data?.price != 0 &&
                <Tooltip content='Premium' color='success'>
                  <Icon
                    className="pointer-events-none text-2xl text-default-400 absolute z-40 right-[1px] top-[1px] h-8 w-8 p-1 shadow-inner bg-gradient-to-bl from-light to-secondlight rounded-xl"
                    icon="solar:crown-bold"
                    color="green"
                  />
                </Tooltip>}
              <Image
                alt={data.title}
                className="w-full object-cover h-[200px]"
                radius="lg"
                shadow="sm"
                src={data.imagePath}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              {/* import {Icon} from "@iconify/react"; */}

              <b>{data.title}</b>  <p className="font-thin text-xs">Category: <span className="capitalize text-sm font-normal"> {data.category}</span></p>
            </CardFooter>
          </Card>
        ))
        }

      </div>


      {/* workout  modal  */}
      <Modal isOpen={isOpenWorkout} onOpenChange={onOpenChangeWorkout} size="full" scrollBehavior="inside" >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{selectedWorkout.title}</ModalHeader>
              <ModalBody>
                <div className="bg-secondlight dark:bg-background border-1 border-background/20 p-2 flex flex-col md:flex-row gap-4 h-full rounded-xl">
                  <div className="flex flex-col gap-2 w-full md:w-9/12">

                    <div
                      className="w-full h-full flex flex-col items-center justify-center rounded-xl relative bg-black"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <video
                        ref={videoRef}
                        src={selectedWorkout.videoPath}
                        controls={false}
                        className="rounded-xl w-full"
                        onClick={handlePlayPause}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                      ></video>

                      {isHovered && (
                        <button
                          className={`absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-6xl font-bold cursor-pointer bg-light/50 p-0 hover:p-4 rounded-full border-light/60 border-1 transition-all ease-in-out duration-300 hover:scale-110`}
                          onClick={handlePlayPause}
                        >
                          <Icon
                            className="bg-light rounded-full p-3"
                            icon={isPlaying ? 'solar:pause-bold' : 'solar:play-bold'}
                            color="#16b650"
                          />
                        </button>
                      )}

                      {isHovered && (
                        <div className="absolute bottom-4 w-[98%] bg-light/80 text-background p-3 rounded-lg">


                          <div className="flex items-center justify-between">

                            <div className="flex items-center space-x-2">
                              <Icon icon="solar:volume-bold" className="text-xl" />
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-24 appearance-none bg-gray-700 rounded-lg rotate-270"
                              />
                            </div>

                            <div className=" flex items-center gap-2">
                              <button
                                className="text-white bg-gray-700 p-1 rounded-md hover:bg-gray-600"
                                onClick={handleFullscreen}
                              >

                                <Icon icon="bx:fullscreen" className="text-xl" />
                              </button>

                            </div>
                          </div>


                          {/* Seek Bar */}
                          <div className="flex justify-between gap-2 text-sm mt-1">
                            <span>{formatTime(currentTime)}</span>
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              value={currentTime}
                              onChange={handleSeek}
                              className="w-full appearance-none bg-gray-700 rounded-lg"
                            />
                            <span>{formatTime(duration)}</span>
                          </div>


                        </div>
                      )}
                    </div>



                    <p className="bg-light dark:bg-secondary border-1 border-background/20 rounded-xl px-4 py-2">
                      <strong>Description:</strong> {selectedWorkout.description}
                    </p>
                  </div>
                  <div className="flex flex-col w-full md:w-3/12 h-full bg-light dark:bg-secondary/50 border-1 border-background/20 rounded-xl p-2">
                    chat section
                  </div>
                </div>

              </ModalBody>
            </>
          )}
        </ModalContent >
      </Modal >
    </>
  )
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Dashboard