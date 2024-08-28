import React from 'react'
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation,matchPath } from 'react-router-dom';

const FootbarLink = ({link,iconName}) => {
 const Icon=Icons[iconName]
    const location=useLocation();


    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }

  return (
  
    <NavLink
      to={link.path}
    
      className={`relative text-lg font-medium ${
        matchRoute(link.path)
          ? " text-yellow-50"
          : "bg-opacity-0 text-richblack-5"
      } transition-all duration-200`}
    >

        <div className='flex flex-col  items-center gap-x-2'>
        <Icon size={24} className="text-xl"/>
        <p className='text-[8.5px]'>{link?.name}</p>
         </div>
      </NavLink>

  )
}

export default FootbarLink
