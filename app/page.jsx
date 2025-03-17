"use client";

import { motion, useAnimation } from "framer-motion";
import { Roboto } from "next/font/google";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "./button.jsx";
import { Card, CardContent } from "./card.jsx";
import Link from "next/link";
import { connectdb } from "../db/connect.js";

export const roboto = Roboto({
  weight: "800",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const conn = await connectdb();
console.log(conn);

export default function Home() {
  
  // Intersection observer for scroll-triggered animations (repeated)
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 }); // trigger animations repeatedly
  const animationControl = useAnimation();

  useEffect(() => {
    if (inView) {
      animationControl.start("visible");
    } else {
      animationControl.start("hidden");
    }
  }, [inView, animationControl]);

  // Variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeInOut" } },
  };

  // Variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Container variants for staggered animations
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Cards animate one after another
      },
    },
  };

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Hero Section */}
        <motion.section
          className="flex flex-col items-center justify-center h-[80vh] px-4 text-center text-white bg-gradient-to-r from-blue-800 to-black sm:h-screen"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <h1 className="text-4xl font-bold mb-4 sm:text-5xl lg:text-7xl">
            Welcome to TradeVault
          </h1>
          <p className="text-lg mb-6 sm:text-xl lg:text-2xl">
            A Place Where you can Buy and Sell Anything...
          </p>
          <Button className="bg-blue-800 text-blue-500 px-4 py-2 rounded-xl font-semibold cursor-pointer">
            <Link href="/addproduct">Add Your Product</Link>
          </Button>
          <button className="btn btn-success mt-4"><Link href="/products">Explore Products</Link></button>
        </motion.section>

        {/* Explore Categories */}
        <motion.section
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={animationControl}
          className="p-4 md:p-6"
        >
          <motion.h2
            className="text-2xl font-bold text-center mb-4 sm:text-3xl"
            variants={sectionVariants} // Apply scroll animation to heading
          >
            Explore Categories
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
            variants={staggerContainer}
          >
            {["Electronics", "Fashion", "Home Appliances", "Books"].map(
              (category) => (
                <motion.div key={category} variants={cardVariants}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold sm:text-lg">{category}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.section>

        {/* Trending Products */}
        <motion.section
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={animationControl}
          className="p-4 md:p-6"
        >
          <h2 className="text-2xl font-bold text-center mb-4 sm:text-3xl">
            Trending Products
          </h2>
          <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" variants={staggerContainer}>
            {[...Array(8)].map((_, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="h-32 bg-gray-300 rounded-xl mb-4 sm:h-40"></div>
                    <p className="text-sm font-bold sm:text-base">Product {index + 1}</p>
                    <p className="text-sm">$99.99</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}
