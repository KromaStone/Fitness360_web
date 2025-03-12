import React from 'react';

function AnimatedBackground() {
    const numberOfBalls = 4;

    const balls = Array.from({ length: numberOfBalls }).map((_, index) => {
        const size = Math.floor(Math.random() * 80 + 40); 
        const delay = Math.random() * 10; 
        const duration = Math.random() * 20 + 10; 
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.7)`; 

        return (
            <div
                key={index}
                className="absolute rounded-full animate-orbit"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                }}
            ></div>
        );
    });

    return (
        <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
            {balls}
        </div>
    );
}

export default AnimatedBackground;