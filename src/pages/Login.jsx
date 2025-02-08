/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/api/v1/users/admin-login`,
        { email, password }
      );
      if (response.data.success) {
        console.log(response.data);
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="login text-center text-2xl font-bold text-gray-700">
          Admin Panel
        </h2>
        <form onSubmit={onSubmitHandler} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

/*   const [formdata, setFormdata] = useState({
      email: "",
      password: ""
  });

  const onChangeHandler = (e) => {
      console.log("e.target::",e.target);
      setFormdata({
          ...formdata,
          [e.target.id]: e.target.value
      });
      
  };

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      console.log('Form submitted:', formdata);
  }; */
