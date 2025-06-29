import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ApplicationUserProvider } from '../../utils/ApplicationUserContext.jsx';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';
import { RoutesData } from './UsersRoutesData';

const Layout = () => {
    const [isSideMenuOpen, setSideMenuOpen] = useState(false);
    const toggleSideMenu = () => setSideMenuOpen((prev) => !prev);

    return (
        <ApplicationUserProvider>
            <div className="bg-secondlight dark:bg-background text-background dark:text-light flex  min-h-screen p-3 gap-3">
                <div
                    className={`fixed md:relative z-50 transition-transform duration-300 
                        ${isSideMenuOpen ? 'translate-x-0 ' : '-translate-x-full '} 
                        md:translate-x-0`}
                >
                    <SideMenu RoutesData={RoutesData} toggleSideMenu={toggleSideMenu} />
                </div>
                <div className=" w-full  relative flex  flex-col gap-3">
                    <TopMenu RoutesData={RoutesData} toggleSideMenu={toggleSideMenu} />
                    <div className="border-1 border-background/20 dark:border-light/10  flex-1  rounded-lg p-1 px-2 sm:p-2 sm:px-3 bg-light dark:bg-secondary h-[calc(100vh-96px)] overflow-x-hidden">
                        <Outlet />
                    </div>
                </div>


            </div>
        </ApplicationUserProvider>
    );
};

export default Layout;
