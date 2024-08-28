import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const[emailSent,setEmailSent]=useState(false);
    const[email,setEmail]=useState("");
    const dispatch=useDispatch();

const{loading}=useSelector((state)=>state.auth);

const handleOnSubmit= (e)=>{
    e.preventDefault();
    dispatch(getPasswordResetToken(email,setEmailSent))

}

  return (
    <div className="flex h-[90vh] w-11/12 mx-auto justify-center items-center">
        { loading ? (
 <div className='text-white font-bold spinner'></div>
        ):(
            <div className="max-w-[500px]  p-4 lg:p-8">
            <h1 className="text-[1.875rem] font-semibold text-center leading-[2.375rem] text-richblack-5">
            {
                !emailSent?(
                    "Reset Your Password"
                ):(
                    "Check Your Mail"
                )
            }
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-center text-richblack-100">
  {
            !emailSent
                ? ("Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery")
                : (`We have sent the reset email to ${email}`)}
        
          </p>
          <form onSubmit={handleOnSubmit}>
            {
                !emailSent &&(
                    <label className='w-full  '>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                        <input required type='text' name='email' value={email} 
                        placeholder='Enter Your Email address'
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                              className="form-style text-white bg-richblack-800
                              py-3 mt-2 pl-3 rounded-lg w-full"
                        />
                    </label>
                )
            }
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex mx-auto items-center text-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-center text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
           </div>
        )}
      
    </div>
  )
}

export default ForgotPassword
