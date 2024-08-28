import React from 'react'
import { slide as Menu } from 'react-burger-menu';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import './MyBurgerMenu.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';
const BurgerMenu = ({NavbarLinks , matchRoute,subLinks}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);

  const location=useLocation();
  const {token}=useSelector((state)=>state.auth);
  const [loading, setLoading] = useState(false)
  const menuRef = useRef(null);

  // This function toggles the menu open state
  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  // This function is called when a menu item is clicked
  const closeMenu = () => {
    setMenuOpen(false);
    setSubmenuVisible(false);
  };


  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible); // Toggle submenu visibility
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Menu
     width={200}    
     customBurgerIcon={  <AiOutlineMenu  fill="#AFB2BF" /> }
     customCrossIcon={ <RxCross2  fill="#AFB2BF"/>}
  
     isOpen={menuOpen}
     onStateChange={handleStateChange}
ref={menuRef}

         >
 <h1 className='heading'>Menu</h1>


                {
                    NavbarLinks.map((link,index)=>
                        (
                        <li className='text-white cursor-pointer' key={index}>
                        {link.title ==="Catalog"?(
                          
                
                          <div 
                          className="menu-item catalog-menu"
       
        onClick={toggleSubmenu}><p className='flex gap-3'>{link?.icon} {link.title}</p>


                      


       <div >
                        </div>
                        </div>
                 
                        )
                        :
                        (<Link to={link?.path} onClick={closeMenu}>
                        <p className  ={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25 "} menu-item flex gap-3 items-center`}>
                     {link?.icon}
                        {link.title}
                        </p>
                        </Link>
                        )}
                        </li> 
                        ))}
        

                        {submenuVisible && (
          <div className=" submenu" >
          {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                            
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                    onClick={closeMenu}
                                  className=" sublinks "
                                  key={i}
                                >
                                  <p   className=" sublinks ">{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Categories Found</p>
                        )}
          </div>
        )}
  </Menu>
  )
}

export default BurgerMenu
