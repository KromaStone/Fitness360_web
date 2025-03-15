import { motion } from "framer-motion";
import { useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from "sonner";
import { fadeIn } from "../assets/utils/motion";
import { product1, product2, product3, product4 } from '../components/images';
import { NextButton } from "../components/NextButton";

function Shop() {

  useEffect(() => {
    document.title = 'Shop | Fitness360'
  }, [])

  const products = [
    { id: 1, image: product1, name: 'Super Dumble', price: ' 10' },
    { id: 2, image: product2, name: 'Bench of Power', price: ' 20' },
    { id: 3, image: product3, name: 'Squard Supreme', price: ' 30' },
    { id: 4, image: product4, name: 'Weight of Legends', price: ' 40' },
    { id: 5, image: product1, name: 'Mega Dumble', price: ' 50' },
    { id: 6, image: product2, name: 'Bench Beast', price: ' 60' },
    { id: 7, image: product3, name: 'Squard King', price: ' 70' },
    { id: 8, image: product4, name: 'Ultimate Weight', price: ' 80' },
    { id: 9, image: product1, name: 'Dumble Force', price: ' 90' },
    { id: 10, image: product2, name: 'Titanic Bench', price: ' 100' },
    { id: 11, image: product3, name: 'Squard Master', price: ' 110' },
    { id: 12, image: product4, name: 'Colossal Weight', price: ' 120' },
    { id: 13, image: product1, name: 'Dumble Powerhouse', price: ' 130' },
    { id: 14, image: product2, name: 'Bench Titan', price: ' 140' },
    { id: 15, image: product3, name: 'Squard Xtreme', price: ' 150' },
  ];

  const workFeature = () => {
    toast.info('working on it')
  }
  return (
    <>
      <Toaster className="" richColors position="top-right" closeButton />
      <section className="py-2  sm:py-4 lg:py-8 px-4 sm:px-8 lg:px-32 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
        <motion.p
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.1, 0.3)}
          className="text-base sm:text-md lg:text-lg text-left w-full justify-start items-center flex gap-2 text-secondary dark:text-secondlight uppercase  font-semibold">
          Our Products <span className="bg-primary h-[2px] rounded-md w-10 inline-block"></span>
        </motion.p>
        <motion.h2
          whileInView="show"
          initial="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeIn("", "", 0.2, 0.4)}
          className="text-2xl sm:text-3xl md:4xl lg:text-5xl xl:6xl font-bold tracking-wide fade_appear text-left w-full mb-2  sm:mb-4 lg:mb-8"
        >
          Shop Out Latest Products
        </motion.h2>


        {/* Product Cards */}
        <div
          className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 w-full ">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-secondlight dark:bg-black/60 dark:border-secondlight/5 border-1 border-secondary/5  rounded-xl p-4 flex flex-col items-center">
              <div className="bg-light dark:bg-secondary/80 border-1 border-background/10 dark:border-secondlight/5 rounded-xl p-2 h-52 overflow-hidden flex items-center justify-center w-full">
                <LazyLoadImage
                  src={product?.image}
                  alt={product.name}
                  className="w-full hover:scale-110 object-cover rounded-md mb-4 transition ease-in-out duration-300"
                />
              </div>
              <div className="flex items-center justify-between w-full my-2 px-1">
                <h3 className="text-lg font-semibold text-center">{product.name}</h3>
                <p className="text-sm text-secondary/70 dark:text-secondlight/70">&#8377;
                  {product.price}</p>
              </div>
              <div className="flex justify-between gap-2 w-full">
                <NextButton className="w-5/12 bg-light text-background border-background/30 border-1 dark:bg-secondary/90 dark:text-light dark:border-light/5" onClick={workFeature}>
                  save
                </NextButton>
                <NextButton className="w-7/12" onClick={workFeature}>
                  Add to Cart
                </NextButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Shop;
