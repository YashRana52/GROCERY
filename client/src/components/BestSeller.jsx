import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

function BestSeller() {
  const { products } = useAppContext();

  return (
    <div className="mt-16 px-1 sm:px-6 md:px-10">
      <p className="text-xl sm:text-2xl md:text-3xl font-medium mb-6">
        Best Sellers
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
}

export default BestSeller;
