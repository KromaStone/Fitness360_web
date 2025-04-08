import { Outlet } from "react-router-dom"
import { motion, useScroll, useSpring } from "framer-motion"
import CursorFollower from "../components/CursorFollower"
import Footer from "./Footer"
import Navbar from "./Navbar"

function HomePage() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    originX: 0,
                    backgroundColor: "#16b650",
                    zIndex: 1000,
                }}
            />
            <Navbar />
            <CursorFollower />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomePage