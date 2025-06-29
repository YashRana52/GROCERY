import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
//fetch seller status

const fetchSeller = async () => {
  try {
    const { data } = await axios.get('/api/seller/is-auth');

    setIsSeller(data.success);
  } catch (error) {
toast.error(error.message);
    setIsSeller(false);
  }
};
//fetch user-auth status,User data and cart Items

const fetchUser = async ()=>{
  try {

    const {data} = await axios.get('/api/user/is-auth')
    if (data.success) {
      setUser(data.user)
      setCartItems(data.user.cartItems)
      
    }
    
  } catch (error) {
    console.log(error);
    
    setUser(null)
    
  }
}

  
  // Fetch all products
  const fetchProducts = async () => {
    try {
      const {data} =await axios.get('/api/product/list')
       if (data.success) {
           setProducts(data.products)
       }else{
        toast.error(data.message)
       }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  // Add product to cart 
  const addToCart = (itemId) => {
    let cartData = { ...cartItems };

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success('Added to Cart');
  };

  // Update cart item quantity 
  const updatecartItem = (itemId, quantity) => {
    let cartData = { ...cartItems };
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    toast.success('Cart Updated');
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success('Removed from Cart');
  };

  //calculate total cart items
  const getCartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item]
    }
    return totalCount;
  }
  //return the total cart amount
  const getCartAmount = ()=>{
    let totalAmount = 0;
    
    for(const items in cartItems){
      let itemInfo = products.find((product)=>product._id === items)
      if (cartItems[items]>0) {
        totalAmount+= itemInfo.offerPrice * cartItems[items]
        
      }
    }
    return Math.floor(totalAmount * 100)/100

  }

  useEffect(() => {
    fetchUser()
    fetchSeller()
    fetchProducts();
  }, []);

  //update database cart items

useEffect(() => {
  const updatecart = async () => {
    try {
      const { data } = await axios.post('/api/cart/update', {
        userId: user._id,
        cartItems,
      });

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) {
    updatecart();
  }
}, [cartItems]);

  const value = {
    currency,
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    cartItems,
    addToCart,
    removeFromCart,
    updatecartItem,
    searchQuery, 
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,fetchProducts,setCartItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  return useContext(AppContext);
};
