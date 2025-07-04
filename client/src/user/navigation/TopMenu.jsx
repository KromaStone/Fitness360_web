import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";
import profileBanner from "../../assets/images/profileBanner.jpg";
import { fadeIn } from "../../assets/utils/motion";
import { bellIcon, searchIcon } from "../../components/icons";
import { profilePic } from '../../components/images';
import { NextButton } from "../../components/NextButton";
import ThemeToggle from "../../theme/ThemeToggle";
const imgBaseUrl = '';

const TopMenu = ({ RoutesData, toggleSideMenu }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(profilePic)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home')
        } else {
            const decodedToken = jwtDecode(token);
            let userName = decodedToken.userName;
            let nameParts = userName.split(' ');
            let cleanedName = nameParts.filter(part => part !== 'undefined' && part.trim() !== '').join(' ');
            setUserName(cleanedName);
            setUserEmail(decodedToken.email);
            setProfilePicture(decodedToken.profilePicture)
        }
    }, [])
    const [isOpen, setIsOpen] = useState(false);

    const toggleProfileModal = () => {
        setIsOpen(isOpen === true ? false : true)
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            toggleProfileModal();
        }
    };

    const logoutClick = () => {
        localStorage.clear('token');
        sessionStorage.clear('token');
        navigate('/home')
    }
    const profileClick = () => {
        navigate('/user/profile');
        toggleProfileModal();
    }

    const searchClick = () => {
        alert('searchClick')
    }
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const toggleMenu = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };
    return (
        <>
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("", "", 0.1, .2)}
                className="border-1 border-background/20 dark:border-light/10 h-fit flex bg-light dark:bg-secondary items-center justify-between px-[2px] sm:px-1 md:px-2 lg:px-3 xl:px-4 rounded-lg py-2">
                {/* <span className="bg-red-400 relative"></span> */}
                <button
                    onClick={toggleSideMenu}
                    className="md:hidden text-background dark:text-light focus:outline-none"
                >
                    {
                        isHamburgerOpen === false ?
                            <Icon
                                icon="solar:hamburger-menu-broken"
                                width="24"
                                height="24"
                                className={`hover:scale-110 hover:text-primary transition-all ease-in-out duration-300 ${isHamburgerOpen ? 'opacity-0 scale-75 invisible hidden' : 'opacity-100 scale-100 visible'}`}
                                onClick={toggleMenu}
                            />
                            :
                            <Icon
                                icon="radix-icons:cross-2"
                                width="24"
                                height="24"
                                className={`hover:scale-110 hover:text-primary transition-all ease-in-out duration-300 ${isHamburgerOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-75 invisible hidden'}`}
                                onClick={toggleMenu}
                            />

                    }



                </button>
                <label className="relative hidden sm:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2" onClick={searchClick}>
                        <LazyLoadImage src={searchIcon} alt="" className='w-5 opacity-55' />
                    </span>
                    <input
                        className=" placeholder:italic placeholder:text-slate-400 block border border-slate-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:border-gray-300 focus:ring-gray-300 focus:ring-1 sm:text-sm shadow-sm w-72 transition-width duration-300 ease-in-out focus:w-[300px] "
                        placeholder="Search..." type="search" name="search"
                    />
                </label>
                <div className="flex gap-1 sm:gap-3 md:gap-4 lg:gap-6 items-center">

                    <ThemeToggle />
                    <span className="h-5 w-5">
                        <LazyLoadImage src={bellIcon} className='shadow-2xl h-5 w-5 hover:shadow-2xl relative ' />
                    </span>
                    <span className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center hover:shadow-xl">
                        <LazyLoadImage src={imgBaseUrl + profilePicture} alt="User" className='object-cover w-12 h-12 border rounded-full cursor-pointer' onClick={toggleProfileModal} />
                    </span>
                </div>
            </motion.div>

            {isOpen && (
                <div
                    className={`fixed inset-0 flex items-start justify-end bg-background bg-opacity-5 z-50 transition ease-in-out duration-700 `}
                    onClick={handleOverlayClick}
                >
                    <motion.div initial='hidden' animate='show' variants={fadeIn("left", "spring", .1, 0.5)} className="bg-light dark:bg-background rounded-lg shadow-lg w-72 border  top-20 absolute right-8 h-[350px] border-background/50 dark:border-light/50" onClick={(e) => e.stopPropagation()}>

                        <div className='p-1 flex flex-col items-center justify-center '>
                            <LazyLoadImage src={profileBanner} alt="" className='rounded-lg w-full h-40 object-cover' />
                            <LazyLoadImage src={imgBaseUrl + profilePicture} alt="" className='rounded-full w-24 h-24 top-[-48px] object-cover bg-gradient-to-tr from-background to-secondary relative shadow-black border-white border-3' />

                        </div>


                        <div className="px-5 relative top-[-40px]">
                            <p className='text-xl text-center font-bold'>{userName}</p>
                            <p className='text-base text-center font-semibold'>{userEmail}</p>
                        </div>

                        <div className="flex justify-evenly gap-4 p-2  relative top-[-40px]">
                            <NextButton
                                onClick={profileClick}
                                type="primary"
                                className='w-full'
                            >Profile</NextButton>
                            <NextButton
                                onClick={logoutClick}
                                type="primary"
                                className='w-full'
                            >Logout</NextButton>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default TopMenu;
