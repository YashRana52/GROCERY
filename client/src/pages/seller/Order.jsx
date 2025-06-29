import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets, } from '../../assets/assets';
import toast from 'react-hot-toast';

function Order() {
  const { currency,axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/seller/')
    if (data.success) {
      setOrders(data.orders)
      
    }else{
      toast.error(data.message)
    }
      
    } catch (error) {
      toast.error(error.message)
      
      
    }

    
   
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 h-screen overflow-y-auto no-scrollbar p-4 md:p-10 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Orders List</h2>

      <div className="space-y-6 max-w-5xl mx-auto">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-5 md:grid md:grid-cols-[2fr_2fr_1fr_1fr]"
          >
            {/* Product Info */}
            <div className="flex gap-4">
              <img src={assets.box_icon} alt="box" className="w-12 h-12 opacity-70" />
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-800 font-medium leading-tight">
                    {item.product.name}
                    {item.quantity > 1 && (
                      <span className="text-sm text-primary ml-1">x {item.quantity}</span>
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-gray-600 text-sm leading-5">
              <p className="text-gray-800 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p>📞 {order.address.phone}</p>
            </div>

            {/* Amount */}
            <div className="text-lg font-semibold text-gray-800 flex items-center">
              {currency}{order.amount}
            </div>

            {/* Status */}
            <div className="text-sm space-y-1">
              <p><span className="font-medium text-gray-700">Method:</span> {order.paymentType}</p>
              <p><span className="font-medium text-gray-700">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-GB',{day: '2-digit',
  month: 'short',
  year: 'numeric'})}</p>
              <p>
                <span className="font-medium text-gray-700">Payment:</span>{' '}
                <span className={order.isPaid ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
