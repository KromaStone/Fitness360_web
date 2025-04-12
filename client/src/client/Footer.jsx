import { Icon } from '@iconify/react/dist/iconify.js';
import logo from '../assets/logos/logo.png';
function Footer() {
  return (
    <>
      <section className="py-0 lg:py-4 px-4 sm:px-8 lg:px-32  xl:px-52 bg-light text-background dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
        <div className="  max-w-[1550px] m-auto">
          <footer className="hidden md:grid p-4 grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-2 xl:gap-8 2xl:gap-20 mt-6 ">
            {/* Brand Section */}
            <div className="space-y-4 w-full mb-6">
              <div className="flex items-center gap-2 justify-start">
                {/* <Icon icon="mdi:dumbbell" className="text-primary" width="32" height="32" /> */}
                <img src={logo} alt="" className='h-12 mr-2' />
                <a href='/' className="text-4xl font-bold hover:text-primary transition ease-in-out duration-250">Fitness360</a>
              </div>
              <p className=" text-secondary/80 dark:text-light/80">
                Begin with a thorough assessment of your current fitness level, considering
                factors like strength, flexibility.
              </p>
              <div>
                <h3 className="font-semibold mb-3 text-xl">Social Network:</h3>
                <div className="flex gap-3">
                  <a href="#" className="group p-2 rounded-full border border-background/25 dark:border-secondlight/30 hover:border-primary dark:hover:bg-primary bg-secondary/10 dark:bg-secondlight/20 hover:bg-primary transition-all ease-in-out duration-300">
                    <Icon icon="mdi:facebook" width="24" height="24" className='text-background dark:text-light group-hover:text-light' />
                  </a>
                  <a href="#" className="group p-2 rounded-full border border-background/25 dark:border-secondlight/30 hover:border-primary dark:hover:bg-primary bg-secondary/10 dark:bg-secondlight/20 hover:bg-primary transition-all ease-in-out duration-300">
                    <Icon icon="mdi:twitter" width="24" height="24" className='text-background dark:text-light group-hover:text-light' />
                  </a>
                  <a href="#" className="group p-2 rounded-full border border-background/25 dark:border-secondlight/30 hover:border-primary dark:hover:bg-primary bg-secondary/10 dark:bg-secondlight/20 hover:bg-primary transition-all ease-in-out duration-300">
                    <Icon icon="mdi:instagram" width="24" height="24" className='text-background dark:text-light group-hover:text-light' />
                  </a>
                  <a href="#" className="group p-2 rounded-full border border-background/25 dark:border-secondlight/30 hover:border-primary dark:hover:bg-primary bg-secondary/10 dark:bg-secondlight/20 hover:bg-primary transition-all ease-in-out duration-300">
                    <Icon icon="mdi:linkedin" width="24" height="24" className='text-background dark:text-light group-hover:text-light' />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className='lg:flex w-full gap-8 justify-between  hidden '>
              <div className=''>
                <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-1 xl:space-y-[6px]">
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">About Us</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Terms of Use</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Our Services</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Contact Us</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Privacy Policy</a></li>
                </ul>
              </div>

              {/* Our Service */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Our Service</h3>
                <ul className="space-y-1 xl:space-y-[6px dark:hover:text-light]">
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Personal Training</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Group Training</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Muscle Building</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Virtual Gym Training</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Weightless Training</a></li>
                  <li className='flex hover:translate-x-1 transition-all ease-in-out duration-250'> <Icon icon='iconamoon:arrow-right-2-bold' width={20} height={24} /> <a href="#" className="font-semibold text-background/60 dark:text-light/70 hover:text-background transition dark:hover:text-light">Body Stretching</a></li>
                </ul>
              </div>
            </div>

            {/* Recent Post */}
            <div className='w-full flex justify-end'>
              <div>
                <h3 className="text-xl font-semibold mb-6">Recent Post</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop"
                      alt="Fitness workout"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className=" text-secondary/80 dark:text-light font-semibold hover:text-primary dark:hover:text-primary transition">
                        <a href="#">Fitness Workouts for a Healthier You</a>
                      </h4>
                      <p className="text-primary text-base mt-2">12 Jan, 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=300&h=300&fit=crop"
                      alt="Fitness workout"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className=" text-secondary/80 dark:text-light font-semibold hover:text-primary dark:hover:text-primary transition">
                        <a href="#">Fitness Workouts for a Healthier You</a>
                      </h4>
                      <p className="text-primary text-base mt-2">12 Jan, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>


      <div className="h-[1px] bg-secondlight dark:bg-background/50"></div>
      <div className="px-16 py-2 sm:px-8 bg-light dark:bg-background dark:text-light sm:text-center text-[14px]">
        &copy; 2024 Fitness360. All Rights Reserved.
      </div>
    </>
  )
}

export default Footer;