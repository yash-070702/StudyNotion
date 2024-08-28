import React from 'react';
import { sidebarLinks } from '../../../data/dashboard-links';
import FootbarLink from './FootbarLink';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ACCOUNT_TYPE } from '../../../utils/constant';

const Footbar = () => {

  const {user,loading:profileLoading}=useSelector((state)=>state.profile);
  const{loading:authLoading}=useSelector((state)=>state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()



  if(
    profileLoading || authLoading
 ){
  return (
    <div className=" h-[calc(100vh-3.5rem)] min-w-[220px]  border-r-[1px]  bg-richblack-800">
      <div className="spinner"></div>
    </div>
  )
}  
return (
  <div className=' w-full px-5 bg-black  ' >
    <div className="flex  w-full justify-between flex  bg-black    py-2 ">
      <div className={`${user.accountType===ACCOUNT_TYPE.STUDENT?"w-[72%]":"w-[80%]"} flex  justify-between ` }>
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <FootbarLink key={link.id} link={link} iconName={link.icon} />
          )
        })}
      </div>

      <div className="">
        <FootbarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />
       
      </div>
    </div>
   
  </div>
)
}

export default Footbar
