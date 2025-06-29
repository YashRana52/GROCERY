import React from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function ProductList() {
  const { products, setProducts, currency, axios } = useAppContext();

  const toggleStock = async (id, newInStockValue) => {
    // Optimistic UI update
    const updatedProducts = products.map((product) =>
      product._id === id ? { ...product, inStock: newInStockValue } : product
    );
    setProducts(updatedProducts);

    try {
      const { data } = await axios.post('/api/product/stock', {
        id,
        inStock: newInStockValue,
      });

      if (data.success) {
        toast.success(data.message);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      // Revert the change on error
      const reverted = products.map((product) =>
        product._id === id ? { ...product, inStock: !newInStockValue } : product
      );
      setProducts(reverted);
      toast.error(error.message || 'Failed to update stock');
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden p-4">
      <h2 className="pb-4 text-lg font-medium">All Products</h2>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex flex-col items-center max-w-4xl w-full mx-auto overflow-hidden rounded-md bg-white border border-gray-300">
          <table className="w-full table-auto">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-200">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img src={product.image[0]} alt="Product" className="w-16" />
                    </div>
                    <span className="truncate max-sm:hidden w-full">{product.name}</span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product.inStock}
                        onChange={() => toggleStock(product._id, !product.inStock)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-gray-300 peer-checked:bg-primary rounded-full transition-colors duration-200"></div>
                      <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
