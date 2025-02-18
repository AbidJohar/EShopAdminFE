/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const ListPage = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchData = async () => {
    // console.log("Fetching product list...");
    try {
      const response = await axios.get(`${backend_url}/api/v1/products/list-product`);
      if (response.data.success) {
        // console.log("Response ", response.data);
        setProductList(response.data.products);
      }
    } catch (error) {
      console.log("Error from ListPage:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(`${backend_url}/api/v1/products/remove-product?id=${selectedProductId}`);
  
      if (response.data.success) {
        toast.success("Product deleted successfully");
         await fetchData();
      }
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setShowModal(false);
      setSelectedProductId(null);
    }
  };
  

  return (
    <div className='m-4'>
      <h1 className="font-bold text-2xl my-2 text-gray-600">List of Products</h1>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-200 font-semibold">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {productList.length === 0 ? (
          <div className="flex items-center justify-center pt-10 text-gray-900 text-xl">
            Product list is empty
          </div>
        ) : (
          <div className="flex flex-col w-full gap-2">
            {productList.map((item, index) => (
              <div
                className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-white shadow-md rounded-lg p-2"
                key={index}
              >
                <img className="w-20 h-20 object-cover rounded-md" src={item.image[0]} alt="Product" />
                <p className="text-lg text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-700">{item.category}</p>
                <p className="text-sm font-semibold text-gray-900">Rs. {item.price}</p>
                <div className="flex justify-center">
                  <img
                    className="w-6 h-6 cursor-pointer"
                    src={assets.delete_icon}
                    alt="Delete"
                    onClick={() => handleDeleteClick(item._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-gray-200  p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-4">This action cannot be undone.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListPage;
