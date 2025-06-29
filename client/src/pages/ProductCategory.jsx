import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

function ProductCategory() {
  const { products } = useAppContext();
  const { category } = useParams();

  // Find the matching category object from 'categories' array
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category?.toLowerCase()
  );

  // Filter products based on category
  const filterProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="mt-16 px-1 sm:px-6 md:px-10">
      {/* Show category name if matched */}
      {searchCategory && (
        <p className="text-xl sm:text-2xl md:text-3xl font-medium mb-6">
          {searchCategory.text.toUpperCase()}
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </p>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductCategory;
