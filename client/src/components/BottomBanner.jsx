import React from 'react';
import { assets, features } from '../assets/assets';

function BottomBanner() {
  return (
    <div className='relative mt-20'>
      {/* Desktop Banner */}
      <img
        src={assets.hero4}
        alt='banner'
        className='w-full max-h-[450px] object-cover hidden md:block'
      />

      {/* Mobile Banner */}
      <img
        src={assets.bottom_banner_image_sm}
        alt='banner'
        className='w-full max-h-[300px] object-cover md:hidden'
      />

      {/* Content Overlay */}
      <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-65'>
        <div className=' backdrop-blur-sm rounded-xl p-4 md:p-6 max-w-md'>
          <h1 className='text-2xl md:text-3xl font-semibold text-primary mb-6'>
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className='flex items-start gap-4 mt-3'>
              <img src={feature.icon} alt={feature.title} className='md:w-11 w-9' />
              <div>
                <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
                <p className='text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomBanner;
