import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, Toaster } from "sonner";
import { fadeIn } from "../assets/utils/motion";
import { NextButton } from "../components/NextButton";
import { getAllProducts } from "../services/productService";
import { Spinner } from "@nextui-org/react";

function Shop() {

  useEffect(() => {
    document.title = 'Shop | Fitness360'
  }, [])

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchAllProducts(currentPage);
  }, [currentPage, searchTerm, selectedCategory]);

  const workFeature = () => {
    toast.info('working on it')
  }

  const fetchAllProducts = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const result = await getAllProducts(
        page,
        pageSize,
        searchTerm,
        selectedCategory
      );
      // console.log('products ', result);
      setProducts(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    } finally {
      setLoading(false);
    }
    // setLoading(true);
  };

  return (
    <>
      <Spinner label="Loading..." color="success" className={`absolute top-15 z-50 bg-light dark:bg-background w-screen h-screen ${loading === true ? "" : "hidden"}`} />

      <Toaster className="" richColors position="top-right" closeButton />
      <section className="py-2  sm:py-4 lg:py-8 px-4 sm:px-8 lg:px-32 bg-light text-background  dark:bg-background dark:text-light flex flex-col justify-center items-center gap-2 sm:gap-4">
        <div className="max-w-[1440px] m-auto">

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
              <motion.div
                whileInView="show"
                initial="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={fadeIn("down", "spring", (index * 0.07), 0.3)}
                key={index}
                className={`bg-secondlight dark:bg-black/60 dark:border-secondlight/5 border-1 border-secondary/5  rounded-xl p-4 flex flex-col items-center z-[${index}]`}>
                <div className="bg-light dark:bg-secondary/80 border-1 border-background/10 dark:border-secondlight/5 rounded-xl p-2 h-52 overflow-hidden flex items-center justify-center w-full">
                  {product.images && product.images.length > 0 && (
                    <LazyLoadImage
                      src={product?.images[0]}
                      alt={product.name}
                      className="w-full hover:scale-110 object-cover rounded-md mb-4 transition ease-in-out duration-300"
                    />
                  )}

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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
