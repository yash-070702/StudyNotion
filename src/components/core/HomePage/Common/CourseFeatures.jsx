import React from 'react'
import { courseFeaturesData } from '../../../../data/courseFeaturesData'
const CourseFeatures = () => {

  return (
    <div className='grid p-5 rounded-xl my-10 bg-richblack-800 grid-cols-1 lg:grid-cols-2 gap-10 text-white'>

    {
     
      courseFeaturesData.map((detail,key)=>(
        <div className='flex gap-3 lg:gap-7 items-center' key={key}>
        <div className='bg-richblack-700 rounded-full p-3 lg:p-5 flex justify-center items-center'>{detail.icon}</div>
        <p className='text-[1.1rem]' >{detail.text}</p>
        </div>
      ))
    }
      
    </div>
  )
}

export default CourseFeatures;
