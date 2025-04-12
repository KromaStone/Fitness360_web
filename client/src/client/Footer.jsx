import { Icon } from '@iconify/react/dist/iconify.js';
import logo from '../assets/logos/logo.png';

function Footer() {
  const footerData = {
    brand: {
      name: "Fitness360",
      logo,
      description: "Begin with a thorough assessment of your current fitness level, considering factors like strength, flexibility.",
    },
    socialLinks: [
      { icon: "mdi:facebook", url: "#" },
      { icon: "mdi:twitter", url: "#" },
      { icon: "mdi:instagram", url: "#" },
      { icon: "mdi:linkedin", url: "#" },
    ],
    quickLinks: [
      { title: "About Us", url: "#" },
      { title: "Terms of Use", url: "#" },
      { title: "Our Services", url: "#" },
      { title: "Contact Us", url: "#" },
      { title: "Privacy Policy", url: "#" },
    ],
    services: [
      "Personal Training",
      "Group Training",
      "Muscle Building",
      "Virtual Gym Training",
      "Weightless Training",
      "Body Stretching",
    ],
    recentPosts: [
      {
        title: "Fitness Workouts for a Healthier You",
        date: "12 Jan, 2024",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop",
      },
      {
        title: "Fitness Workouts for a Healthier You",
        date: "12 Jan, 2024",
        image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=300&h=300&fit=crop",
      },
    ]
  };

  const { brand, socialLinks, quickLinks, services, recentPosts } = footerData;

  return (
    <>
      <div className='h-10 bg-light dark:bg-background'></div>
      <section className="w-full gap-4 h-full border-solid px-6 sm:px-12 lg:px-24 md:py-4 md:pt-16 bg-light text-background dark:bg-background dark:text-light flex flex-col justify-center items-center sm:gap-4 relative" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/abstract-dark-low-poly-background_1409-1860.jpg?t=st=1744478371~exp=1744481971~hmac=f4f8cc089a0bd2dd5ab11babfddfbf6912770fd02b64104f5261b5b8581327f5&w=1380')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="max-w-[1550px] m-auto ">




          <div className="md:flex flex-col hidden md:flex-row justify-center items-center gap-6 absolute top-[-84px] left-0 right-0 w-full mx-auto max-w-[1550px] m-auto z-10 mt-8">
            {/* Call Section */}
            <div className="flex items-center gap-4 w-5/12 lg:w-4/12 p-3 md:p-6 backdrop-blur-sm rounded-2xl bg-secondary/60 dark:bg-secondary/70">
              <div className="bg-primary p-2 md:p-4 rounded-full">
                <Icon icon="ph:phone-fill" className="w-6 h-6 md:w-6 md:h-6 text-white" />
              </div>
              <div className='text-light'>
                <p className="text-xs md:text-sm">CALL US ANYTIME:</p>
                <a
                  href="tel:+1635-698-2541"
                  className="text-lg md:text-2xl font-semibold hover:text-primary transition-colors"
                >
                  +1 635-698-2541
                </a>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex items-center gap-4 w-5/12 lg:w-4/12 p-3 md:p-6 backdrop-blur-sm rounded-2xl bg-secondary/60 dark:bg-secondary/70 justify-end">
              <div className='text-light'>
                <p className="text-xs md:text-sm">EMAIL US:</p>
                <a
                  href="mailto:info@fitkit.com"
                  className="text-lg md:text-2xl font-semibold hover:text-primary transition-colors"
                >
                  info@fitness360.com
                </a>
              </div>
              <div className="bg-primary p-2 md:p-4 rounded-full">
                <Icon icon="ph:envelope-fill" className="w-6 h-6 md:w-6 md:h-6 text-white" />
              </div>
            </div>
          </div>









          <footer className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-2 xl:gap-8 2xl:gap-20 mt-6">
            {/* Brand */}
            <div className="space-y-4 w-full mb-6">
              <div className="flex items-center gap-2 justify-start">
                <img src={brand.logo} alt="" className="h-12 mr-2" />
                <a href="/" className="text-4xl font-bold hover:text-primary transition duration-250">{brand.name}</a>
              </div>
              <p className="text-secondary/80 dark:text-light/80">{brand.description}</p>

              <div>
                <h3 className="font-semibold mb-3 text-xl">Social Network:</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, i) => (
                    <a key={i} href={social.url} className="group p-2 rounded-full border border-background/25 dark:border-secondlight/30 hover:border-primary dark:hover:bg-primary bg-secondary/10 dark:bg-secondlight/20 hover:bg-primary transition-all ease-in-out duration-300">
                      <Icon icon={social.icon} width="24" height="24" className="text-background dark:text-light group-hover:text-light" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links + Services */}
            <div className="lg:flex w-full gap-8 justify-between hidden">
              <div>
                <h3 className="text-xl font-semibold mb-1">Quick Links</h3>
                <span className="bg-gradient-to-r from-primary to-transparent h-[2px] rounded-md w-full inline-block  mb-6"></span>
                <ul className="space-y-1 xl:space-y-[6px]">
                  {quickLinks.map((link, i) => (
                    <li key={i} className="flex hover:translate-x-1 transition-all duration-250">
                      <Icon icon="iconamoon:arrow-right-2-bold" width={20} height={24} />
                      <a href={link.url} className="ml-1 font-semibold text-background/60 dark:text-light/70 hover:text-background dark:hover:text-light transition">{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-1">Our Service</h3>
                <span className="bg-gradient-to-r from-primary to-transparent h-[2px] rounded-md w-full inline-block  mb-6"></span>
                <ul className="space-y-1 xl:space-y-[6px]">
                  {services.map((service, i) => (
                    <li key={i} className="flex hover:translate-x-1 transition-all duration-250">
                      <Icon icon="iconamoon:arrow-right-2-bold" width={20} height={24} />
                      <a href="#" className="ml-1 font-semibold text-background/60 dark:text-light/70 hover:text-background dark:hover:text-light transition">{service}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="w-full flex justify-end">
              <div>
                <h3 className="text-xl font-semibold mb-1">Recent Post</h3>
                <span className="bg-gradient-to-r from-primary to-transparent h-[2px] rounded-md w-6/12 inline-block  mb-6"></span>
                <div className="space-y-4">
                  {recentPosts.map((post, i) => (
                    <div key={i} className="flex gap-4">
                      <img src={post.image} alt={post.title} className="w-20 h-20 object-cover rounded" />
                      <div>
                        <h4 className="text-secondary/80 dark:text-light font-semibold hover:text-primary dark:hover:text-primary transition">
                          <a href="#">{post.title}</a>
                        </h4>
                        <p className="text-primary text-base mt-2">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>

      <div className="h-[1px] bg-secondlight dark:bg-background/50"></div>
      <div className="px-16 py-2 sm:px-8 bg-light dark:bg-background dark:text-light sm:text-center text-[14px]">
        &copy; 2024 {brand.name}. All Rights Reserved.
      </div>
    </>
  );
}

export default Footer;
