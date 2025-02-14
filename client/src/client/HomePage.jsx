import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"
import CursorFollower from "../components/CursorFollower"

function HomePage() {
    return (
        <>
            <Navbar />
            <CursorFollower />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomePage