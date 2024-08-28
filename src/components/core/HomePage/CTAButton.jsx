import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({children,active,linkto}) => {
  return (
  <Link to={linkto}>
   <div className={`text-center text-[13px] lm:text-[16px] px-4 py-3  lg:px-6 lg:py-3 rounded-md font-bold 
   ${active ?("bg-yellow-50 text-black"):("bg-richblack-800 text-white")}
   hover:scale-95 transtion-all duration-200 `}>
   {children}
      </div>
      </Link>  
   
  )
}

export default CTAButton
