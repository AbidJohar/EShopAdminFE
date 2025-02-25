/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const OrderPage = ({ token }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({}); // State to track status changes per order
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(`${backend_url}/api/v1/orders/list`, {}, { headers: { token } });
      if (response.data.success) {
        console.log("response:", response.data.allOrders);
        setAllOrders(response.data.allOrders);
      }
    } catch (error) {
      console.log("Error in fetchAllOrders func:", error);
    }
  };
  const updateHandler = async (e, orderId) => {
    console.log("orderid and status",orderId,e.target.value);
    
    try {
      const response = await axios.post(`${backend_url}/api/v1/orders/status`, {orderId, status:e.target.value}, { headers: { token } });
      if (response.data.success) {
         await fetchAllOrders();
         toast.success(response.data.message)
      }
    } catch (error) {
      console.log("Error in fetchAllOrders func:", error);
    }
  };

  

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Orders</h1>

      {allOrders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
            >
              {/* Icon, Product Name, and Address (Stacked Vertically) */}
              <div className="mb-4">
                {/* Icon Placeholder (Simulating the box icon) */}
                <div className="flex items-start mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center mr-3">
                    <span className="text-gray-500 text-xs">📦</span>
                  </div>

                  {/* Product Name */}
                  <div className="flex-1">
                    {order.item.map((item, index) => (
                      <p key={index} className="text-lg font-semibold text-gray-900">
                        {item.name} x{order.item.length}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Store/Address Info */}
                <div className="mt-2">
                  <p className="text-sm text-gray-600"> <span className='font-bold text-black'>Name:</span> {order.address.firstName} {order.address.lastName}</p>
                  <p className="text-sm text-gray-600"> <span className='font-bold text-black'>Email:</span> {order.address.email}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                  <span className='font-bold text-black'>Address: </span>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}
                  </p>
                  <p className="text-sm text-gray-600">{order.address.phone}</p>
                </div>
              </div>

              {/* Order Details (Aligned Horizontally in a Row) */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-sm text-gray-700"><strong className='text-black'>Items:</strong> {order.item.length}</p>
                  <p className="text-sm text-gray-700"><strong className='text-black'>Method:</strong> {order.paymentMethod}</p>
                  <p className="text-sm text-gray-700"><strong className='text-black'>Payment:</strong> {order.payment ? 'Completed' : 'Pending'}</p>
                  <p className="text-sm text-gray-700"><strong className='text-black'>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold text-green-600"><strong>Total:</strong> PKR {order.amount}</p>
                  <select
                   onChange={(e)=> updateHandler(e, order._id)}
                   value={order.status}
                    className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;