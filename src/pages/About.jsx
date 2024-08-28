import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/HomePage/AboutPage/Quote';
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponenet from '../components/core/HomePage/AboutPage/Stats';
import LearningGrid from '../components/core/HomePage/AboutPage/LearningGrid';
import Footer from '../components/core/HomePage/Common/Footer';
import ContactFormSection from '../components/core/HomePage/AboutPage/ContactFormSection';
import ReviewSlider from '../components/core/HomePage/Common/ReviewSlider';
const About = () => {
  return (
    <div className='text-white'> 
    <section className="bg-richblack-700 mt-2 ">
        <div className="relative mx-auto flex w-11/12  flex-col justify-between   text-center text-white">
          <header className="mx-auto pt-10 pb-10 text-3xl lg:text-4xl font-semibold  lg:w-[60%]">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className=""></div>
          <div className="flex lg:flex-row flex-col lg:mx-5 px-5  lg:mx-0 lg:px-0  gap-5   lg:gap-0 lg:justify-around border-2 rounded-xl  border-white py-8 mb-10">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section>
      <div>
        <Quote />
      </div>  
      </section>

      <section className='mb-10'>
        <div className="mx-auto flex lg:w-9/12 w-11/12  max-w-maxContent flex-col text-richblack-500">
          <div className="flex flex-col items-center lg:flex-row justify-between">
            <div className=" flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text md:text-4xl text-3xl font-semibold text-transparent lg:w-[70%] ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            <div className='mt-10 lg:mt-0'>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className=" flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-3xl md:text-4xl font-semibold text-transparent mx-auto lg:mx-0 lg:w-[70%] mt-10 lg:mt-10 ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>
            <div className=" flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text mx-auto lg:mx-0 text-4xl font-semibold lg:w-[70%] mt-20 lg:mt-0 ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
              Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet/>

      <LearningGrid/>
<div className='sm:mx-auto l:w-3/12 xl:w-4/12'> 

  <ContactFormSection/>
  </div>
  <div className="relative mx-auto mb-10 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
         
      </div>
      <div  className='bg-richblack-900 my-20 text-white mx-auto w-11/12    gap-8'>
  <h1 className='text-center text-4xl font-semibold my-10'>Review From Other Learners</h1>
 <ReviewSlider/>
 </div>


<Footer/>
    </div>
  )
}

export default About
