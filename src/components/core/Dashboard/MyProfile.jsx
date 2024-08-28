import React, { useEffect } from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoIosSettings } from "react-icons/io";
import IconBtn from '../HomePage/Common/IconBtn';
import { formattedDate } from '../../../utils/dataFormatter';
const MyProfile = () => {
    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.profile)

    let splittedEmail=user?.email.split(".");
      useEffect(()=>console.log(user.additionalDetails),[]);
  return (
    <div >
    <div className='flex justify-between px-5'>  <h1 className="mb-14 text-2xl md:text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div>
      
      <IoIosSettings onClick={() => {
              navigate("/dashboard/settings")
            }} color='white' size={30} />
      </div>
      </div>

      <div  className='block   border-[1px] rounded-md border-richblack-700 bg-richblack-800  md:border-none md:bg-transparent p-3 md:p-0'>
       <div className="flex  flex-col  md:flex-row md:items-center md:justify-between rounded-md md:border-[1px] md:border-richblack-700 md:bg-richblack-800 md:p-8 md:px-12">
        <div className="flex   flex-col md:flex-row items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] md:w-[78px] mb-3 md:mb-0 rounded-full object-cover"
          />
          <div className="space-y-1 text-center md:text-start ">
            <p className="lg:text-lg  font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
      
       
        <div className='hidden md:block'>  <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
      
        
      </div>

      <div className=" -my-5 md:my-10 flex flex-col gap-y-10 rounded-md md:border-[1px] md:border-richblack-700 md:bg-richblack-800 md:p-8 md:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold hidden md:block text-richblack-5">About Me</p>
          <div className='hidden md:block'>  <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } font-bold text-center md:text-start md:font-medium `}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className=" my-20 md:my-10 flex flex-col gap-y-10 rounded-md md:border-[1px] md:border-richblack-700 md:bg-richblack-800 md:p-8 md:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <div className='hidden md:block'>  <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
        
         
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5 ">
            <div>
              <p className="mb-2 text-sm text-richblack-200">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
             <p className="mb-2 text-sm w-[100px] text-richblack-200">Email</p>
            
            <p className="lg:text-sm  font-medium text-richblack-5">
                {splittedEmail[0]}. {splittedEmail[1]}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-200">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-200">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-200">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.ContactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-200">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div></div>
     

    </div>
  )
}

export default MyProfile
