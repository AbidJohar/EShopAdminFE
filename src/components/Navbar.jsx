/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {assets} from '../assets/assets'


const Navbar = ({setToken}) => {

const clickHandler = ()=>{
  setToken("");
}
  return (
    <div className='flex items-center justify-between px-4'>
       <img className='w-30 sm:w-40' src={assets.logo} alt="logo" />
        <button onClick={clickHandler} className='px-7 py-2 sm:px-5 bg-gray-700 text-center hover:bg-gray-800 text-white font-semibold rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
