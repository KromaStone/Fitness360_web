/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  darkMode: "class",
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // dark theme colors
        background: "#111419",  // Main dark 
        secondary: "#1d2029",  // Secondary dark 
        light: "#ffffff",      // Light
        secondlight: "#dddddd", //second light
        primary: "#16b650",    // Green 
        "hover-primary": "#13a048", // Slightly darker green for hover effects
        blue: "#0064d7",
      },
      backgroundImage: {
        'callbanner': "url('./src/assets/images/call-banner.png')",
        'footer-texture': "url('/img/footer-texture.png')",
        'custom-gradient': 'linear-gradient(90deg, rgba(255,255,255,1) 33%, rgba(255,255,255,0) 100%)',
      },
      dropShadow: {
        '3xl': '0 25px 25px rgba(0, 0, 0, 0.4)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ],
        'myshadow': '0 45px 65px rgba(0,0,0,0.5)'
      },
      animation: {
        'revolve': 'revolvingBackground 5s linear infinite',
      },
      keyframes: {
        revolvingBackground: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(200px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(200px) rotate(-360deg)' },
        },
      },
      animation: {
        orbit: 'orbit linear infinite',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
