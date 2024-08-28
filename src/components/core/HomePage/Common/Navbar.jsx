import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import Logo from "../../../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import {useSelector} from "react-redux";
import ProfileDropDown from "../Auth/ProfileDropDown";
import {apiConnector} from "../../../../services/apiconnector";
import {categories} from "../../../../services/apis";
import { MdKeyboardArrowDown } from "react-icons/md";

import BurgerMenu from "./BurgerMenu";
import { courseEndpoints } from "../../../../services/apis";
import SearchCourses from "./SearchCourses";


const Navbar = () => {
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  const {totalItems}=useSelector((state)=>state.cart);
  const [loading, setLoading] = useState(false)
  const [subLinks, setSubLinks] = useState([]);

const location=useLocation();

const fetchSubLinks= async()=>{
  setLoading(true);
  try{
    const result = await apiConnector("GET",categories.CATEGORIES_API);
     setSubLinks(result.data.data);
      }
      catch(error){
    console.log("Could not fetch the category list");
      }
      setLoading(false);
}

useEffect(()=>{
 fetchSubLinks();

},[]);


    const matchRoute=(route)=>{
return matchPath({path:route},location.pathname)
    }


  return (
    <div
      className={`flex h-14  items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >

      <div className='flex md:w-11/12 w-full mr-2 md:mr-0  max-w-maxContent  items-center justify-between'>
      <div className="md:hidden relative "> 
      <BurgerMenu NavbarLinks={NavbarLinks} matchRoute={matchRoute} subLinks={subLinks} />
      </div>

<div className={`${token?"-ml-10 ":"-ml-2 "} w-[90px] md:w-[110px] lg:w-[160px]  lg:-ml-0 lg:h-[32px]`}> <Link to="/">
            <img src={Logo}  loading="lazy" />
        </Link></div>
       
        {/* Navigation links */}
        <nav className="hidden md:block ml-16">
            <ul className='flex gap-x-6 text-richblack-25 items-center'>
                {
                    NavbarLinks.map((link,index)=>
                        (
                        <li className='text-white cursor-pointer' key={index}>
                        {link.title ==="Catalog"?(
                          
                          <div  className='flex group text-richblack-25 flex-row items-center'><p>{link.title}</p><MdKeyboardArrowDown />


                      
                          <div className={` invisible absolute z-[100]    h-6 w-6  bg-richblack-5 top-[6.2%] ${token?"left-[40%]":"left-[38%] "} rotate-45 opacity-0 z-0 transition-all duration-150
                        group-hover:visible group-hover:opacity-100 group-hover:z-[1000]`}>
                        </div>

       <div className={` absolute invisible ${token?"left-[37%]":"left-[32%] "} top-[8%] flex flex-col rounded-md bg-richblack-5 font-semibold 
       gap-5 capitalize p-6 z-10 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                         w-[300px]`}>

        
                       
                   
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
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                            </>
                        ) : (
                          <p className="text-center">No Categories Found</p>
                        )}
                        </div>
                        </div>
                 
                        )
                        :
                        (<Link to={link?.path}><p className  ={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>{link.title}
                        </p>
                        </Link>
                        )}
                        </li> 
                        ))}
            </ul>
        </nav>




        <div className='flex gap-x-4 items-center '>

{/* login/signup/dashboard */}

<div ><SearchCourses/></div>

{
  user && user?.accountType==='Student' &&(
    <Link to="/dashboard/cart" className='relative'>
     <FaCartPlus size={25} color="white" />
   
    {
      totalItems>0 && (
        <span className="absolute -bottom-0 -right-0 grid h-5 w-5  place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span>
      )
    }
    </Link>
  )
}
{
  token===null && (
    <Link to="/signup">

    <button className='border border-richblack-700 bg-richblack-800 text-[12px] lg:text-[16px] px-2 py-1  lg:px-[12px] lg:py-[8px] bg-yellow-50 text-black font-semibold rounded-md hover:scale-95 transtion-all duration-200 '>Sign Up</button>
    </Link>
  )
}
{
  token===null && (
    <Link to="/login">
      <button className='border border-richblack-700 bg-richblack-700 text-[12px] lg:text-[16px] px-2 py-1  lg:px-[12px] lg:py-[8px] text-richblack-5 font-semibold rounded-md hover:scale-95 transtion-all duration-200 '>Log In</button>
    </Link>
  )
}
{
  token!==null && <ProfileDropDown/>
}

        </div>
       
      </div>
    </div>
  )
}

export default Navbar;
