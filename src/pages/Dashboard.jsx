import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Footbar from "../components/core/Dashboard/Footbar";
const Dashboard = () => {
 
 const{loading:authLoading}=useSelector((state)=>state.auth);
 const{loading:profileLoading}=useSelector((state)=>state.profile);

 if(
    profileLoading || authLoading
 ){
 return(
    <div className='flex justify-center items-center spinner'></div>
 )
}
    return (
    <div className='relative  flex min-h-[calc(100vh-3.5rem)]'>
    <div className='hidden lg:block'><Sidebar/></div>
    <div className='block lg:hidden fixed bottom-0 left-0 z-[2000] w-full bg-gray-800 text-white'><Footbar/></div>
    <div className=' flex-1 max-h-[calc(100vh-3.5rem)] overflow-auto '>
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
    <Outlet/>
    </div>   
    </div>   
    </div>
  )
}

export default Dashboard
