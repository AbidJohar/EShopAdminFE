/* eslint-disable no-unused-vars */
import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className=" bg-white border-r-[1px] border-black text-black h-screen w-[20%] flex items-start justify-end py-10">
      <ul>
        <NavLink 
          to='/add' 
          className={({ isActive }) => 
            `${isActive ? 'bg-gray-400' : ''} mb-4 flex p-3 rounded-l-md items-center w-full justify-start border-[1px] border-r-0 border-black`
          }
        >
           <img className='w-6 mr-2 ' src={assets.add_icon} alt="" />
          <span className='hidden md:block'>Add items</span>
        </NavLink>
        <NavLink 
          to='/list'
          className={({ isActive }) => 
            `${isActive ? 'bg-gray-400' : ''} mb-4 flex p-3 rounded-l-md items-center w-full justify-start border-[1px] border-r-0 border-black`
          }
        >
          <img className='w-8 mr-2' src={assets.parcel_icon} alt="" />
          <span className='hidden md:block'>List items</span>
        </NavLink>
        <NavLink 
          to='/order'
          className={({ isActive }) => 
            `${isActive ? 'bg-gray-400' : ''} mb-4 flex p-3 rounded-l-md items-center w-full justify-start border-[1px] border-r-0 border-black`
          }
        >
           <img className='w-6 mr-2' src={assets.order_icon} alt="" />
          <span className='hidden md:block'>Orders info</span>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
