import '../styleSheets/Home.css'
import React, { Suspense } from 'react'
const Loader = React.lazy(() => import('../components/Loader.jsx'))
const Banner = React.lazy(() => import('./home/Banner.jsx'));
const StatBanner = React.lazy(() => import('./home/StatBanner.jsx'));
const ChooseUs = React.lazy(() => import('./home/ChooseUs.jsx'));
const Trainers = React.lazy(() => import('./Trainers.jsx'));
const Coaches = React.lazy(() => import('./home/Coaches.jsx'));
const JoinToday = React.lazy(() => import('./home/JoinToday.jsx'));
const CallUs = React.lazy(() => import('./home/CallUs.jsx'));
const Faq = React.lazy(() => import('./home/faq.jsx'));


function Home() {
  const components = [Banner, StatBanner, ChooseUs, Trainers, Coaches, JoinToday, CallUs, Faq
  ];
  // const components = [Banner, StatBanner, ChooseUs, Trainers, Coaches, JoinToday, CallUs];

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
