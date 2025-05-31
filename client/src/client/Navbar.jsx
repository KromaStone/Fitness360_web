import { motion } from 'framer-motion';
import { Suspense, useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fadeIn } from '../assets/utils/motion.js';
import { NextButton } from '../components/NextButton';
import ThemeToggle from '../theme/ThemeToggle.jsx';
import logo from './../assets/logos/logo.png';
import logo_white from './../assets/logos/logo_white.png';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);

    const joinNowClick = () => {
        navigate('/login');
    }

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const navbarLinks = [
        { to: 'home', label: 'Home' },
        { to: 'about', label: 'About' },
        { to: 'trainers', label: 'Trainers' },
        { to: 'service', label: 'Service' },
        { to: 'shop', label: 'Shop' },
    ];

    // Function to check if a link is active
    const isActive = (path) => {
        return location.pathname === `/${path}` ||
            (path === 'home' && location.pathname === '/');
    };

    return (
        <section className='bg-light dark:bg-background'>
            <nav className="z-50 sticky top-0 py-1 md:py-2 bg-gradient-to-b from-light via-light dark:from-background dark:via-background to-transparent md:h-[74px]">
                <div className=' top-2 left-0 w-full px-1 md:px-4 z-10'>
                    <div
                        className="rounded-xl p-2 flex justify-between  bg-light dark:bg-secondary border border-secondlight/90 dark:border-light/20 shadow-whitell shadow-innerkk"
                    >
                        {/* Logo */}
                        <LazyLoadImage src={logo} alt="logo" className="h-10 block dark:hidden" />
                        <LazyLoadImage src={logo_white} alt="logo" className="h-10 hidden dark:block" />

                        {/* Desktop Menu */}
                        <div className={`md:flex items-center gap-6 hidden md:visible z-10 flex-col md:flex-row`}>
                            {navbarLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    aria-current={isActive(link.to) ? 'page' : undefined}
                                    className="hover:text-background transition-colors text-background/90 dark:text-light/90 dark:hover:text-light  group relative"
                                >
                                    {link.label}
                                    <span
                                        className={`absolute bottom-0 left-0 pt-[2px] ${isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'} transition-all ease-in-out duration-300`}
                                        style={{ backgroundColor: '#16b650' }}
                                    ></span>
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
                            <svg className="w-6 h-6 block dark:hidden" fill="none" stroke="black" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className="w-6 h-6 dark:block hidden" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className=" h-screen w-full  absolute z-20 md:flex items-start justify-end px-1 pt-2"
                        style={{
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}
                        onClick={toggleMenu}
                    >
                        <motion.div
                            initial="hidden"
                            animate="show"
                            variants={fadeIn('left', '', 0, 0.3)}
                            className="md:hidden rounded-xl flex flex-col w-full float-right items-end py-4 px-2 bg-light text-background dark:bg-secondary dark:text-light border border-secondlight/90 dark:border-light/20 shadow-whitell shadow-inner"
                        >
                            {navbarLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => toggleMenu}
                                    className={`hover:text-blue-600 text-lg mb-2 w-full text-end px-2 py-1 rounded-md hover:bg-secondlight/40 dark:hover:bg-light/15 transition-all duration-200 ease-in-out text-background dark:text-light group`}
                                >
                                    <span
                                        className={`px-1 group-hover:mr-2 transition-all ease-in-out duration-300 ${isActive(link.to) ? 'border-b-2' : ''}`}
                                        aria-current={isActive(link.to) ? 'page' : undefined}
                                        style={{ borderColor: isActive(link.to) ? '#16b650' : 'transparent' }}> {link.label}</span>
                                </Link>
                            ))}
                            <div className='flex flex-col items-end justify-end gap-2 '>
                                <div className='w-full'><ThemeToggle /></div>
                                <NextButton onClick={joinNowClick} type="primary" size="medium" >Sign In</NextButton>
                            </div>
                        </motion.div>
                    </div>
                )}
            </nav>
        </section>
    );
}

export default Navbar;