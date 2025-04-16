import { motion } from 'framer-motion';
import { Suspense, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fadeIn } from '../assets/utils/motion.js';
import { NextButton } from '../components/NextButton';
import ThemeToggle from '../theme/ThemeToggle.jsx';
import logo from './../assets/logos/logo.png';
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);

    const joinNowClick = () => {
        navigate('/login');
    }

    // Toggle Menu Function
    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    // Close menu when clicked outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    // Navbar Links
    const navbarLinks = [
        { to: 'home', label: 'Home' },
        { to: 'about', label: 'About' },
        { to: 'trainers', label: 'Trainers' },
        { to: 'service', label: 'Service' },
        { to: 'shop', label: 'Shop' },
    ];

    return (
        <nav className="z-50 sticky top-0 py-1 md:py-2 bg-gradient-to-tr from-light from-10% via-secondlight to-light  dark:from-background dark:via-secondary dark:to-background md:h-[74px]">
            {/* <nav className="py-2 bg-gradient-to-t from-secondary to-background"> */}
            <div className=' top-2 left-0 w-full px-1 md:px-4 z-10'>
                <div
                    className="rounded-xl p-2 flex justify-between  bg-background/50 dark:bg-background/90 border border-background/20 dark:border-light/10"
                // style={{ backgroundColor: 'rgba(0, 0, 0, .4)' }}
                >
                    {/* Logo */}
                    <LazyLoadImage src={logo} alt="logo" className="h-10" />

                    {/* Desktop Menu */}
                    <div className={`md:flex items-center gap-6 hidden md:visible z-10 flex-col md:flex-row`}>
                        {navbarLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                aria-current={location.pathname === link.to ? 'page' : undefined}
                                className="hover:text-light transition-colors text-light/90  group relative"
                            >
                                {link.label}
                                <span className='absolute bottom-0 left-0 bg-primary pt-[2px] w-0 group-hover:w-full transition-all ease-in-out duration-300'>

                                </span>
                            </Link>
                        ))}
                    </div>
                    {/* Sign-in Button */}
                    <div className="hidden md:flex gap-2">
                        <ThemeToggle />

                        <Suspense fallback={<div>Loading...</div>}>
                            <NextButton onClick={joinNowClick} type="background" className='z-50'>Sign In</NextButton>
                        </Suspense>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden focus:outline-none z-50"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    ref={menuRef}

                    className="h-screen w-full  absolute z-20 md:flex items-start justify-end p-4"
                    style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }}
                    onClick={toggleMenu}
                >
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={fadeIn('left', '', 0, 0.3)}
                        className="rounded-xl flex flex-col w-full float-right items-end pr-4 pl-16 py-4"
                        style={{ backgroundColor: 'rgba(0, 0, 0, .9)' }}
                    >
                        {navbarLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => toggleMenu}
                                className="hover:text-blue-600 transition-colors text-light text-lg mb-2"
                                aria-current={location.pathname === link.to ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className='flex flex-col items-end justify-end gap-2 text-light'>
                            <div className='w-full'><ThemeToggle /></div>
                            <NextButton onClick={joinNowClick} type="primary" size="medium" >Sign In</NextButton>
                        </div>
                    </motion.div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
