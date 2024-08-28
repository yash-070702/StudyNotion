import React from 'react'
import CTAButton  from './CTAButton';
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InstructorSection = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  return (
    <div className=''>
        <div className="flex flex-col bg-white p-10 rounded-xl lg:flex-row   items-center justify-between">
          <div className="lg:w-[40%] lg:ml-10">
            <img 
              src={Instructor}
              alt="Instructor_image  "
              className=" rounded-xl "
            />
          </div>
          <div className="lg:w-[40%] mt-10 lg:mt-0 flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl text-black font-semibold ">
              Become an
              <HighlightText text={" Instructor "} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-900">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit">
            {
              token?(<button className='text-center text-[13px] sm:text-[16px]  bg-yellow-50 text-black px-6 py-3 rounded-md font-bold '><div className="flex items-center gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
                  Dashboard
                  <FaArrowRight />
                </div></button>):(<CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>)
            }
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection