import React, { Suspense, useEffect, useState } from 'react';
import '../styleSheets/Home.css';
import { Spinner } from '@nextui-org/react';
import FitnessBot from '../utils/FitnessBot.jsx';
import { Modal, ModalContent, Button, } from "@nextui-org/react";
const Banner = React.lazy(() => import('./home/Banner.jsx'));
const ServicesHome = React.lazy(() => import('./home/ServicesHome.jsx'));
const JoinToday = React.lazy(() => import('./home/JoinToday.jsx'));
const Faq = React.lazy(() => import('./home/Faq.jsx'));
const UpcomingClasses = React.lazy(() => import('./home/UpcomingClasses.jsx'));
const Trainers = React.lazy(() => import('../client/Trainers.jsx'));
const ChooseUs = React.lazy(() => import('../client/ChooseUs.jsx'));
const Marquee = React.lazy(() => import('../client/home/Marquee .jsx'));
const Bmi = React.lazy(() => import('../client/home/Bmi.jsx'));
const Testimonial = React.lazy(() => import('../client/home/Testimonial.jsx'));
const ClassesSchedule = React.lazy(() => import('../client/home/ClassSchedule.jsx'));
const CompaniesMarquee = React.lazy(() => import('../client/components/CompaniesMarquee.jsx'));
const PhotoGallery = React.lazy(() => import('../client/home/PhotoGallery.jsx'));
const Article = React.lazy(() => import('../client/home/Article.jsx'));


function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open) => setIsOpen(open);


  useEffect(() => {
    document.title = 'Home | Fitness360'
  }, [isOpen])

  const components = [Banner, Marquee, ServicesHome, UpcomingClasses, ClassesSchedule, Trainers, ChooseUs, Bmi, PhotoGallery, Testimonial, Article, CompaniesMarquee, JoinToday, Faq
  ];

  return (
    <>
      <div className=' text-light p-0'>
        <Suspense fallback={
          <Spinner label="Loading..." color="success" className="bg-light dark:bg-background w-full h-[calc(100vh-74px)]" />
        }>

          {Object.keys(components).map((key) => {
            const Component = components[key];
            return <Component key={key} />;
          })}
        </Suspense>

        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50">
          <Button
            onPress={onOpen}
            isIconOnly
            color="primary"
            className="rounded-full w-14 h-14 shadow-lg"
            aria-label="Open chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="bottom-center"
            backdrop='blur'
            className="fixed right-8 bottom-0 m-0"
            classNames={{
              base: "!max-w-[calc(100%-64px)] sm:!max-w-[380px]",
              wrapper: "items-end justify-end",
              body: "p-0"
            }}
            scrollBehavior="inside"
          >
            <ModalContent className="h-[500px] max-h-[80vh]">
              {(onClose) => (
                <FitnessBot />
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Home
