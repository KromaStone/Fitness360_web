import React, { Suspense, useEffect } from 'react';
import '../styleSheets/Home.css';
const Loader = React.lazy(() => import('../components/Loader.jsx'))
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


function Home() {
  useEffect(() => {
    document.title = 'Home | Fitness360'
  }, [])
  const components = [Banner, Marquee, ServicesHome, UpcomingClasses, ClassesSchedule, Trainers, ChooseUs, Bmi, PhotoGallery, Testimonial, CompaniesMarquee, JoinToday, Faq
  ];

  return (
    <>
      <div className=' text-light p-0'>
        <Suspense fallback={<div>
          <Loader />
        </div>}>
          {Object.keys(components).map((key) => {
            const Component = components[key];
            return <Component key={key} />;
          })}
        </Suspense>
      </div>
    </>
  )
}

export default Home
