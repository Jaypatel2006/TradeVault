'use client'
import React, { useState, useEffect } from 'react';

import { motion } from "framer-motion";

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const ProductListingPage = () => {
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);

  const categories = ['All', 'Electronics', 'Fashion', 'Home Appliances', 'Books'];

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const data = await fetch('/api/getproducts');
        const response = await data.json();
        setProducts(response.products);
        console.log(response.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = category === 'All'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat} className="mb-2">
              <button 
                className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                  category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Product Listing</h1>
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="p-4 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transition-transform transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-xl"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-black dark:text-white">{product.name}</h2>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-semibold">₹ {product.price}</span>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListingPage;
