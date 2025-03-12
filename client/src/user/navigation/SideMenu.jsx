import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import { fadeIn } from "../../assets/utils/motion";
import { chevronUpIcon } from "../../components/icons";
import { getUserDetails } from "../../services/userServices/UserData";
const SideMenu = ({ RoutesData, toggleSideMenu }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        age: 0,
        height: 0,
        weight: 0
    });

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token);
            GetUserDetails(decodedToken.id);
        }
    }, [])

    const GetUserDetails = async (userId) => {
        try {
            const result = await getUserDetails(userId)
            setUser(result);
        } catch (e) {
            console.log(e)
        }
    }


    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };
    const handleToggleMenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    const [showSide, setShowSide] = useState(false);

    return (
        <>
            <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("right", "", 0, 0)}
                className={`border-1 border-background/20 dark:border-light/10 shadow-xl sm:m-1 rounded-lg md:block  h-[calc(100vh-96px)] overflow-auto max-w-full text-light dark:text-light  z-40 bg-light dark:bg-secondary ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 overflow-x-hidden`}>
                {/* ${showSide ? 'block absolute' : 'hidden'}` */}
                <div className={`flex justify-between items-center ${collapsed ? 'flex-col border-b-1 border-background/10 dark:border-light/10 pb-2' : 'flex-row'} `}>
                    <h2 className="flex mb-4 mt-2 items-center justify-center ">
                        <LazyLoadImage src={logo} alt="logo" className={`${collapsed ? 'w-24' : 'h-16'}`} />
                    </h2>
                    <button
                        className={`text-background hidden md:block ${collapsed ? 'pr-0 ' : 'pr-4'}`}
                        onClick={toggleCollapse}
                    >

                        {collapsed ?
                            <span className="text-background dark:text-light transition-all ease-in-out duration-150">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19" /></path></svg>
                            </span>
                            :
                            <span className="text-background dark:text-light transition-all ease-in-out duration-150">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="10" strokeDashoffset="10" d="M3 9l3 3l-3 3"><animate fill="freeze" attributeName="strokeDashoffset" dur="0.2s" values="10;0" /></path><path strokeDasharray="16" strokeDashoffset="16" d="M5 5h14"><animate fill="freeze" attributeName="strokeDashoffset" begin="0.2s" dur="0.2s" values="16;0" /></path><path strokeDasharray="10" strokeDashoffset="10" d="M10 12h9"><animate fill="freeze" attributeName="strokeDashoffset" begin="0.4s" dur="0.2s" values="10;0" /></path><path strokeDasharray="16" strokeDashoffset="16" d="M5 19h14"><animate fill="freeze" attributeName="strokeDashoffset" begin="0.6s" dur="0.2s" values="16;0" /></path></g></svg>
                            </span>
                        }
                    </button>
                </div>
                <div className="p-2 pt-0 text-background dark:text-light">
                    {!collapsed && user &&
                        <div>
                            <div className="px-2 mb-1 rounded-md 
                            py-1 cursor-default border-1 dark:border-background/10  
                            bg-background/10 dark:bg-light/10
                            hover:border-background/20 dark:hover:border-light/20 
                            ">
                                <span className="capitalize">{user?.gender} &nbsp;</span>
                                <span>{user?.age} year</span>
                            </div>
                            <div className="flex justify-between px-2 mb-1 rounded-md py-1 cursor-default border-1 dark:border-background/10  
                            bg-background/10 dark:bg-light/10
                            hover:border-background/20 dark:hover:border-light/20">
                                <p className="flex flex-col  justify-center w-full text-xl font-semibold">Height
                                    <span className="text-sm font-normal">
                                        {user?.height} cm
                                    </span>
                                </p>
                                <p className="flex flex-col py-1 px-4 justify-center w-full text-xl font-semibold">Weight
                                    <span className="text-sm font-normal">
                                        {user?.weight} kg
                                    </span>
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <ul className={`transition-all duration-200 ease-in-out`}>
                    {RoutesData.map((menu, index) => (
                        <li key={index} className="group relative" onClick={toggleSideMenu}>
                            <Link
                                to={menu.path}
                                className={`flex items-center p-2 m-2 rounded-lg hover:bg-gray-200 text-background  hover:text-background hover:dark:text-background dark:text-light transition duration-200 ease-in-out ${menu.children ? '' : (location.pathname === menu.path ? 'bg-gray-300 dark:bg-gray-600 text-background ' : '')}`}
                                onClick={() => handleToggleMenu(index)}
                            >
                                <span className={`${collapsed ? 'pl-3' : ''}`}>
                                    <Icon icon={menu.icon} width="24" height="24" className="group-hover:scale-110 group-hover:text-primary transition-all ease-in-out duration-300" />
                                </span>
                                <span className={`transition-opacity duration-200 ${collapsed ? 'opacity-0' : 'opacity-100 ml-2'}`}>
                                    {menu.title}
                                </span>
                                {menu.children && (
                                    <span className={`${openMenu === index ? 'rotate-180' : ''} ${collapsed ? 'hidden' : 'ml-auto transition-transform duration-200'}`}>
                                        <LazyLoadImage src={chevronUpIcon} alt="" className='opacity-50' />
                                    </span>
                                )}
                            </Link>

                            <AnimatePresence>
                                {menu.children && openMenu === index && (
                                    <motion.ul
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="pl-4 text-sm"
                                    >
                                        {menu.children.map((child, childIndex) => (
                                            <li key={childIndex}>
                                                <Link
                                                    to={child.path}
                                                    className={`text-background flex items-center hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out my-1 ${collapsed ? 'ml-2 pl-4 w-12' : 'p-2 mr-2'} ${location.pathname === child.path ? 'bg-gray-300' : ''}`}
                                                >
                                                    <Icon icon={child.icon} width="24" height="24" />

                                                    <span className={`ml-2 transition-opacity duration-200 ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
                                                        {child.title}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </motion.div>

        </>
    );
};

export default SideMenu;
