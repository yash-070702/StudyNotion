import React from "react"

import Footer from "../components/core/HomePage/Common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactUsForm"
import ReviewSlider from "../components/core/HomePage/Common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
        <h1 className="text-white text-4xl text-center lg:text-left font-semibold ">Got a Idea ? We've Got the Skills.Let's team up</h1>
        <p className="mx-auto font-bold text-richblack-300 text-md mb-10 mt-5">Tell us more about yourself and what you are got in a mind</p>
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto  lg:my-0 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
      
      </div>

      <div  className='bg-richblack-900 my-20  text-white mx-auto w-11/12    gap-8'>
  <h1 className='text-center text-4xl font-semibold my-10'>Review From Other Learners</h1>
 <ReviewSlider/>
 </div>

    
      <Footer />
    </div>
  )
}

export default Contact