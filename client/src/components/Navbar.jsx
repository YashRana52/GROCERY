import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


function Navbar() {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin, navigate,searchQuery, 
    setSearchQuery,getCartCount,axios } = useAppContext();

  const logOut = async () => {
   try {
    const {data} = await axios.get('/api/user/logout')
    if (data.success) {
      toast.success(data.message)
      setUser(null)
       navigate('/');
      
    }else{
      toast.error(data.message)
    }

    
   } catch (error) {
    toast.error(error.message)
    
   }
   
  };
  useEffect(()=>{
    if (searchQuery.length>0) {
      navigate('/products')
      
    }

  },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white relative transition-all shadow-sm z-50">

      {/* Logo */}
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img className="h-9" src={assets.logo} alt="Logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">

        {/* Navigation Links */}
        <NavLink to='/' className="hover:text-primary transition">Home</NavLink>
        <NavLink to='/products' className="hover:text-primary transition">All Products</NavLink>
        <NavLink to='/contact' className="hover:text-primary transition">Contact</NavLink>

        {/* Search Bar  */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 py-1.5 rounded-full">
          <input onChange={(e)=>setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className='w-4 h-4' />
        </div>

        {/* Cart Icon */}
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">{getCartCount()}</span>
        </div>

        {/* User Login */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <div className='relative group cursor-pointer'>
            <img src={assets.profile_icon} className='w-10' alt="User" />
            <ul className="absolute right-0 top-12 hidden group-hover:flex flex-col bg-white shadow-lg rounded-md py-2 w-40 text-sm z-50">
              <li onClick={() => navigate('/my-orders')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Orders</li>
              <li onClick={logOut} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
      <div className='flex items-center gap-6 sm:hidden'>
         <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt="cart" className='w-6 opacity-80' />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">{getCartCount()}</span>
        </div>
         {/* Mobile Menu Button */}
      <button onClick={() => setOpen(!open)} aria-label="Menu" >
        <img src={assets.menu_icon} alt="menu" />
      </button>

        
      </div>

     
      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-3 px-5 text-sm sm:hidden z-40 transition-all">
          <NavLink to='/' onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to='/products' onClick={() => setOpen(false)}>All Products</NavLink>
          <NavLink to='/contact' onClick={() => setOpen(false)}>Contact</NavLink>
          {user && (
            <NavLink to='/my-orders' onClick={() => setOpen(false)}>My Orders</NavLink>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                logOut();
              }}
              className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
