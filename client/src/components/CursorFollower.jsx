import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CursorFollower = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsMoving(true);
        clearTimeout(moveTimeout);
        moveTimeout = setTimeout(() => setIsMoving(false), 100);
    };

    let moveTimeout;

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(moveTimeout);
        };
    }, []);

    const cursorVariants = {
        default: () => ({
            // x: mousePosition.x + 6,
            // y: mousePosition.y + 17,
            x: mousePosition.x - 4,
            y: mousePosition.y - 6,
        }),
    };

    // const colors = ["#ffffff", "#b9b9b9", "#5e5e5e", "#ffffff"];
    const colors = ["#0064d7"];
    // const sizes = [40, 30, 20, 10];
    const sizes = [5];

    return (
        <>
            <div className="z-50 flex justify-center items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                        key={index}
                        className={`cursorfollower fixed top-0 left-0 rounded-full z-4`}
                        custom={index}
                        variants={cursorVariants}
                        animate="default"
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 8,
                            delay: index * 0.01,
                        }}
                        style={{
                            width: sizes[index],
                            height: sizes[index],
                            backgroundColor: colors[index],
                            zIndex: isMoving ? 20 - index : 10 - index,
                            // boxShadow: "rgb(255, 255, 255) 0px 0px 10px 2px"
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default CursorFollower;