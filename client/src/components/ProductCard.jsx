import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

function ProductCard({ product }) {
  const { currency, addToCart, removeFromCart, cartItems,navigate } = useAppContext();

  return product && (
  <div
  onClick={() => {
    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    scrollTo(0, 0);
  }}
  className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-all duration-300 w-full"
>

      <div className="p-3">
        <div className="aspect-square w-full flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
          <img
            src={product.image[0]}
            alt={product.name}
            className="object-contain max-h-32 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-3 text-sm text-gray-500">{product.category}</div>
        <h3 className="text-base font-semibold text-gray-800 truncate">{product.name}</h3>

        <div className="flex items-center gap-1 mt-1">
      {Array(5).fill('').map((_, i) => (
  4 > i ? ( // 4 stars filled
    <svg
      key={i}
      width="14"
      height="13"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-primary"
    >
      <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
    </svg>
  ) : (
    <svg
      key={i}
      width="14"
      height="13"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-primary/30"
    >
      <path d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z" />
    </svg>
  )
))}


          <span className="text-xs text-gray-500">{product.rating}</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm md:text-base font-semibold text-green-600">
            {currency}{product.offerPrice}
            <span className="line-through text-gray-400 text-xs ml-1 mr-1">
              {currency}{product.price}
            </span>
          </div>

          <div
  onClick={(e) => e.stopPropagation()}
  className="text-primary w-[72px] sm:w-[80px]"
>
  {!cartItems[product._id] ? (
    <button
      onClick={() => addToCart(product._id)}
      className="w-full flex items-center justify-center gap-1 text-xs px-2 py-1.5 border border-primary text-primary rounded-md bg-primary/10 hover:bg-primary/20 transition"
    >
      <img src={assets.cart_icon} alt="cart_icon" className="w-4 h-4" />
      Add
    </button>
  ) : (
    <div className="w-full flex items-center justify-between text-sm bg-primary/10 border border-primary/30 px-2 py-1 rounded-md">
      <button
        onClick={() => removeFromCart(product._id)}
        className="text-primary font-bold px-2"
      >
        −
      </button>
      <span className="text-sm">{cartItems[product._id]}</span>
      <button
        onClick={() => addToCart(product._id)}
        className="text-primary font-bold px-2"
      >
        +
      </button>
    </div>
  )}
</div>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
