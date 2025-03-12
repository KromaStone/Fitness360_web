import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import TopMenu from "./TopMenu";
import { RoutesData } from "./TrainerRoutesData";

const Layout = () => {
        const [isSideMenuOpen, setSideMenuOpen] = useState(false);
        const toggleSideMenu = () => setSideMenuOpen((prev) => !prev);
    
    return (
        <div className="bg-secondlight dark:bg-background text-background dark:text-light">
            <div className="top-0 w-full p-1 sm:pt-[10px] sm:px-2">
                <TopMenu RoutesData={RoutesData} toggleSideMenu={toggleSideMenu} />
            </div>

            <div className="flex">
                <div
                    className={`fixed md:relative z-50  p-1 transition-transform duration-300 
                        ${isSideMenuOpen ? 'translate-x-0 ' : '-translate-x-full '} 
                        md:translate-x-0`}
                >
                    <SideMenu RoutesData={RoutesData} toggleSideMenu={toggleSideMenu} />
                </div>

                <div className="border-1 border-background/20 dark:border-light/10  flex-1 m-2 ml-2 rounded-lg p-1 px-2 sm:p-2 sm:px-3 bg-light dark:bg-secondary h-[calc(100vh-96px)] overflow-x-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
