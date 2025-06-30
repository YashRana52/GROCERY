import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='relative w-full h-[90vh] '>
      {/* Desktop Banner */}
      <img
        src={assets.hero2}
        alt='banner'
        className='w-full h-full object-cover hidden md:block'
      />

      {/* Mobile Banner */}
      <img
        src={assets.hero2}
        alt='banner'
        className='w-full h-full object-cover block md:hidden'
      />

      {/* Content Overlay - Mobile Only (Top Positioned) */}
      <div className='absolute inset-0 bg-black/30 md:hidden flex flex-col items-center justify-start pt-16 px-6'>
        <h1 className='text-white text-3xl font-bold text-center'>
          Fresh Vegetables Delivered
        </h1>
        <p className='text-white text-sm mt-2 text-center'>
          Experience organic freshness at your doorstep.
        </p>
        <Link
          to='/menu'
          className='mt-4 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300'
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
