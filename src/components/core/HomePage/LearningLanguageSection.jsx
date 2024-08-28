import React from 'react'
import HighlightText from './HighlightText';
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from './CTAButton';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';

const LearningLanguageSection = () => {
  const navigate=useNavigate();
  const {token}=useSelector(state=>state.auth);
  return (
    <div className='mt-10 mb-10'>
    <div className='flex flex-col gap-5'>
    <hr></hr>
        <div
         className='text-4xl font-semibold text-center '>Your Swiss Knife for
        <HighlightText text={" learning any Language "}/></div>
        <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
            <div className="flex flex-col overflow-hidden lg:flex-row items-center justify-center mt-8 lg:mt-0">
              <img
                src={Know_your_progress}
                alt=""
                className="  lg:-mr-32 "
              />
              <img
                src={Compare_with_others}
                alt=""
                className=" lg:-mb-10 lg:-mt-0 -mt-12"
              />
              <img
                src={Plan_your_lessons}
                alt=""
                className="  lg:-ml-36 lg:-mt-5 -mt-16"
              />
            </div>

            <div className="w-fit mx-auto lg:mb-10 mb-8 mt-5">
            {token?(<button className='text-center text-[13px] sm:text-[16px]  bg-yellow-50 max-w-max text-black px-6 py-3 rounded-md font-bold '><div className="flex items-center gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
              Learn More
                  <FaArrowRight />
                </div>
                </button>):(<CTAButton active={true} linkto="/signup" >
 <div className='flex items-center gap-2'>
 <p> Learn More</p>
<FaArrowRight/>
 </div>
  </CTAButton>)}
          </div>
    </div>
      
    </div>
  )
}

export default LearningLanguageSection
