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
        'marquee-gradient-light': 'linear-gradient(90deg, rgb(221, 221, 221) 1%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 95%, rgb(221, 221, 221) 99%)',
        'marquee-gradient-dark': 'linear-gradient(90deg, rgb(29, 32, 41) 1%, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 0) 95%, rgb(29, 32, 41) 99%)',
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
      animation: {
        orbit: 'orbit linear infinite',
        marquee: 'marquee 20s linear infinite',
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
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },

    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
