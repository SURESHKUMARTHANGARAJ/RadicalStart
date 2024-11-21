import React from 'react'
import logo from '../assets/image/logo.jpg'
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";


const Nav = () => {
  return (
    <nav>
        <div className="icon-container">
            <IoSettingsOutline className='profile-icon'/>
        </div>
        <div className="icon-container">
            <FaRegBell className='profile-icon'/>
        </div>
        <div className="img-container">
            <img src={logo} alt="logo" />
        </div>
    </nav>
  )
}

export default Nav
