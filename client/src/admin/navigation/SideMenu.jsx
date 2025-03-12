

import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logos/logo.png';
import { chevronUpIcon, menuIcon, xIcon } from '../../components/icons';
const SideMenu = ({ RoutesData, toggleSideMenu }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleToggleMenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    return (
        <div className={`border-1 border-background/20 dark:border-light/10 shadow-xl sm:m-1 rounded-lg md:block  h-[calc(100vh-96px)] overflow-auto max-w-full text-light dark:text-light  z-40 bg-light dark:bg-secondary ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 overflow-x-hidden`}>
            <div className='flex justify-between items-center'>
                <h2 className="flex mb-4 mt-2 items-center justify-center ">
                    <LazyLoadImage src={logo} alt="logo" className={`${collapsed ? 'h-8 w-24' : 'h-16'}`} />
                </h2>
                <button
                    className={`text-background py-4 ${collapsed ? 'pr-0' : 'pr-4'}`}
                    onClick={toggleCollapse}
                >
                    {collapsed ?
                        <LazyLoadImage src={xIcon} alt="" /> : <LazyLoadImage src={menuIcon} alt="" />}
                </button>
            </div>
            <ul className={`transition-all duration-200 ease-in-out`}>
                {RoutesData.map((menu, index) => (
                    <li key={index} className="relative" onClick={toggleSideMenu}>
                        <Link
                            to={menu.path}
                            className={`flex items-center p-2 m-2 rounded-lg hover:bg-gray-200 text-background hover:text-background hover:dark:text-background dark:text-light transition duration-200 ease-in-out ${menu.children ? '' : (location.pathname === menu.path ? 'bg-gray-300 dark:bg-gray-600 text-background ' : '')}`}
                            onClick={() => handleToggleMenu(index)}
                        >
                            <span className={`${collapsed ? 'pl-3' : ''}`}>
                                <Icon icon={menu.icon} width="24" height="24" />

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
                                                className={`flex items-center hover:bg-gray-200 rounded-lg transition duration-200 ease-in-out my-1 ${collapsed ? 'ml-2 pl-4 w-12' : 'p-2 mr-2'} ${location.pathname === child.path ? 'bg-gray-300' : ''}`}
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
        </div>
    );
};

export default SideMenu;
