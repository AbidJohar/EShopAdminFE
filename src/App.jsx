/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListPage from "./pages/ListPage";
import OrderPage from "./pages/OrderPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/login";
import { ToastContainer } from "react-toastify";

const App = () => {
  // Load token from localStorage when the app starts
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token"); // Remove token when logging out
    }
  }, [token]);

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[75%] mx-auto text-gray-600">
              <Routes>
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListPage token={token} />} />
                <Route path="/order" element={<OrderPage token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
