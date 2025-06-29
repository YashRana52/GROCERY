import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// Reusable input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full py-3 px-4 border border-gray-300 rounded-md outline-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const {axios,user,navigate} = useAppContext()
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };



const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();

    const payload = {
      userId: user._id,   
      address             
    };

    const { data } = await axios.post('/api/address/add', payload);

    if (data.success) {
      toast.success(data.message);
      navigate('/cart');
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(()=>{
    if (!user) {
      navigate('/cart')
      
    }

  },[])

  return (
    <div className='mt-12 pb-16 px-4 sm:px-6 md:px-10 lg:px-20'>
      <p className='text-2xl sm:text-3xl text-gray-700 font-medium text-center md:text-left'>
        Add Shipping <span className='text-primary font-semibold'>Address</span>
      </p>

      <div className='flex flex-col-reverse lg:flex-row justify-between items-center mt-10 gap-10'>
        {/* Form Section */}
        <div className='w-full lg:w-2/3'>
          <form onSubmit={onSubmitHandler} className='space-y-4 text-sm'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email address" />
            <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='zipcode' type="text" placeholder="Zip Code" />
              <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
            </div>

            <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

            <button
              type="submit"
              className='w-full mt-6 bg-primary hover:bg-primary-dull text-white font-medium py-3 rounded-md transition uppercase'
            >
              Save address
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className='w-full lg:w-1/3 flex justify-center lg:justify-end'>
          <img
            className='w-64 sm:w-72 md:w-80 lg:w-96 object-contain'
            src={assets.add_address_iamge} 
            alt="Add Address"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
