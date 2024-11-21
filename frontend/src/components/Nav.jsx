import React, { useContext } from 'react'
import logo from '../assets/image/logo.jpg'
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { GlobalContext } from '../Context/GlobalContext';

const Nav = () => {

  const {handleToggle} = useContext(GlobalContext);

  return (
    <nav>
        <div>
          <MdMenu className='toggled-icon' onClick={handleToggle}/>
        </div>
        <div className='icons'>
          <div className="icon-container">
              <IoSettingsOutline className='profile-icon'/>
          </div>
          <div className="icon-container">
              <FaRegBell className='profile-icon'/>
          </div>
          <div className="img-container">
              <img src={logo} alt="logo" />
          </div>
        </div>
    </nav>
  )
}

export default Nav
