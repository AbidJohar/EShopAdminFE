/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListPage from "./pages/ListPage";
import OrderPage from "./pages/OrderPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";

const App = () => {

 const [token, setToken] = useState('');

  return (
    <div className="min-h-screen ">
       <ToastContainer/>
    {
      token === "" ? 
      
      <Login setToken={setToken} /> :
      <>
      <Navbar  setToken={setToken}/>
      <hr />
      <div className="flex w-full">
        <Sidebar />
      

      <div className="w-[75%]  mx-auto text-gray-600">
        <Routes>
          <Route path="/add" element={<AddProduct  token={token} />} />
          <Route path="/list" element={<ListPage token={token} />} />
          <Route path="/order" element={<OrderPage token={token} />} />
        </Routes>
      </div>
      </div>
      </>
    }

     
      </div>
    
  );
};

export default App;
