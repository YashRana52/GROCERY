import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

function MyOrder() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const FetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user');
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      FetchMyOrders();
    }
  }, [user]);

  return (
    <div className='mt-16 pb-16 px-4'>
      <div className='flex flex-col items-end w-max mb-10 mx-auto md:mx-0'>
        <p className='text-2xl font-semibold uppercase text-gray-700'>My Orders</p>
        <div className='w-16 h-1 bg-primary rounded-full mt-1'></div>
      </div>

      {myOrders.map((order, index) => (
        <div key={index} className='border border-gray-300 rounded-xl mb-10 p-6 shadow-sm bg-white max-w-4xl mx-auto'>
          <div className='flex justify-between flex-wrap gap-2 text-sm md:text-base font-medium mb-4'>
            <span className='text-gray-400'>
              Order ID: <span className='text-gray-700'>{order._id}</span>
            </span>
            <span className='text-gray-400'>
              Payment: <span className='text-gray-700'>{order.paymentType}</span>
            </span>
            <span className='text-gray-400'>
              Total: <span className='text-primary font-semibold'>{currency}{order.amount}</span>
            </span>
          </div>

          {order.items.map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 ${order.items.length !== idx + 1 ? 'border-b border-gray-200' : ''}`}>
              <div className='flex items-center gap-4'>
                <div className='bg-primary/10 p-3 rounded-lg'>
                  <img src={item.product?.image[0]} alt="" className='w-16 h-16 object-cover rounded-md' />
                </div>
                <div>
                  <h2 className='text-gray-800 font-semibold'>{item.product?.name}</h2>
                  <p className='text-sm text-gray-400'>{item.product?.category}</p>
                </div>
              </div>

              <div className='text-sm space-y-1'>
                <p className='text-gray-500'>Quantity: <span className='text-gray-800'>{item.quantity || 1}</span></p>
                <p className='text-gray-500'>Status: <span className='text-gray-800'>{order.status}</span></p>
                <p className='text-gray-500'>Date: <span className='text-gray-800'>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span></p>
              </div>

              <p className='text-sm font-semibold text-primary'>
                Amount: {currency}{item.product?.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrder;
