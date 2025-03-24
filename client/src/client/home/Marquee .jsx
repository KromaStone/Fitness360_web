import React from 'react'

function Marquee() {
    return (

        <div className="overflow-hidden whitespace-nowrap mt-2  md:my-2 lg:my-3 xl:my-4 gd text-background dark:text-light">
            <div className="inline-block animate-marquee">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-[.11em] fade_appear text-left w-full uppercase">
                    FOCUS ON YOUR <span className='text-primary'>WORKOUTS </span> NOT YOUR LOSS&nbsp;<span className='h-full w-full border-2 border-primary/50 p-1'></span>
                    &nbsp;</h2>
            </div>

            <div className="inline-block animate-marquee">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-[.11em] fade_appear text-left w-full uppercase">
                    FOCUS ON YOUR <span className='text-primary'>WORKOUTS </span> NOT YOUR LOSS&nbsp;<span className='h-full w-full border-2 border-primary/50 p-1'></span>
                    &nbsp;</h2>
            </div>
        </div>
    )
}

export default Marquee 