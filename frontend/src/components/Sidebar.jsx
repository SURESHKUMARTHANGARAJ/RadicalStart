import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import { GlobalContext } from '../Context/GlobalContext';

const Sidebar = () => {

  const {activeLink,setActiveLink,isOpen} = useContext(GlobalContext);

  const handleLinkClick = (e,link) => {
    setActiveLink(link); 
  };

  return (
    <aside className={isOpen?"active":""}>
      <div className='title'>
        <p className='text-primary'>RS-TECH</p>
      </div>
      <div className='nav-links'>
        <Link
          to='/'
          className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'dashboard')}
        >
          <TbLayoutGrid className="icon" /> Dashboard
        </Link>
        <Link
          to='/employee'
          className={`nav-link ${activeLink === 'employee' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'employee')}
        >
          <HiUsers className="icon" /> Employee
        </Link>
        <Link
          to='/calender'
          className={`nav-link ${activeLink === 'calendar' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'calendar')}
        >
          <FaCalendarAlt className="icon" /> Calendar
        </Link>
        <Link
          to='/message'
          className={`nav-link ${activeLink === 'messages' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'messages')}
        >
          <BiSolidMessageAltDetail className="icon" /> Messages
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
