import { Outlet } from "react-router-dom"
import CursorFollower from "../components/CursorFollower"
import Footer from "./Footer"
import Navbar from "./Navbar"

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