'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../card.jsx';
import { Button } from '../button.jsx';

const ProductListingPage = () => {
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);

  const categories = ['All', 'Electronics', 'Fashion', 'Home Appliances', 'Books'];

  useEffect(() => {
    // Generate products only on the client-side
    const generatedProducts = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
      price: (Math.random() * 100).toFixed(2),
      category: categories[index % categories.length],
    }));
    setProducts(generatedProducts);
  }, []);

  const filteredProducts = category === 'All'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat}>
              <Button 
                className={`w-full text-left mb-2 ${category === cat ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setCategory(cat)}>
                {cat}
              </Button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product Grid */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Product Listing</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="h-40 bg-gray-300 rounded-xl mb-4"></div>
                <p className="font-bold">{product.name}</p>
                <p>${product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListingPage;
