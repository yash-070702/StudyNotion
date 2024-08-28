import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import Banner from "../assets/Images/banner.mp4";
import CTAButton from '../components/core/HomePage/CTAButton';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/core/HomePage/Common/Footer';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from '../components/core/HomePage/ExploreMore';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ReviewSlider from '../components/core/HomePage/Common/ReviewSlider';

const Home = () => {
  const{token}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  return (
    <div>
      {/* Section 1  */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
  

     <div className='text-center text-4xl font-semibold mt-5'>
      Empower Your Future With 
      <HighlightText text={" Coding Skills"}/>
 </div>

     <div className=" mt-5 lg:w-[60%] text-center text-md font-bold text-rich black-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

    

        <div className="mx-3  mt-8 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="h-[390px] shadow-[20px_20px_rgba(255,255,255)] shadow-[4px_4px_10px_rgba(0, 0, 0, 0.3)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <div className=' group mt-8 p-1  mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transtion-all  duration-200 hover:scale-95 w-fit  hover:drop-shadow-none'>
    <div className='flex flex-row items-center  gap-2 rounded-full px-10 py-[5px]  transtion-all duration-200 group-hover:bg-richblack-900'>
    {token?( <p onClick={()=>toast.error("You Are Already Login In")}>Become an Instructor</p>):(   <Link to={"/signup"} >
    <p>Become an Instructor</p>
</Link> )}
   
      
        <FaArrowRight />
    </div>
  </div>

        <div className='flex flex-row gap-7 mt-8 '>
        {token?(<button className='text-center text-[13px] lg:text-[16px]  bg-yellow-50 max-w-max text-black px-4 py-2 lg:px-6 lg:py-3 rounded-md font-bold '><div className="flex items-center gap-1 lg:gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
              Learn More
                  <FaArrowRight />
                </div>
                </button>):(<CTAButton active={true} linkto="/signup" >
 <div className='flex items-center gap-2'>
 <p> Learn More</p>
<FaArrowRight/>
 </div>
  </CTAButton>)}
  {token?(<button className='text-center text-[13px] :text-[16px]  bg-richblack-800 text-white hover:scale-95 transtion-all duration-200 px-6 py-3 rounded-md font-bold '><div className="flex items-center gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
                  Book A Demo
                 
                </div></button>):(<CTAButton active={false} linkto="/signup">
Book A Demo
   </CTAButton>)}
        </div>
        <div>
 <CodeBlocks  position={"lg:flex-row"}
             heading={
              <div className='w-[100%] lg:text-4xl font-semibold text-white'>
Unlock Your 
<HighlightText text={" Coding potential "}/>
with our online courses.
 </div>
  }
  subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText:"Try it Yourself",
              linkto:"/signup",
              active:true,
            }}
            ctabtn2={{
              btnText:"Learn more",
              linkto:"/login",
              active:false,
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a>\n <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
 /> 
 </div>
<div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] lg:text-4xl font-semibold text-white lg:w-[50%]">
                Start
                <HighlightText text={" coding in seconds "} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
      </div>
      <ExploreMore/>

      {/* Section 2  */}

<div className='bg-pure-greys-5 relative text-richblack-700 '>
 <div className='homepage_bg '>
  <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto '>
<div className='h-[30px]'></div>
<div className='flex flex-row gap-7 text-white '>
{token?(<button className='text-center text-[11px] lg:text-[16px]  bg-yellow-50 text-black px-4 py-2 lg:px-6 lg:py-3 rounded-md font-bold '><div className="flex items-center gap-2 lg:gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
              Explore Catalogue
                  <FaArrowRight />
                </div></button>):(<CTAButton active={true} linkto="/signup" >
 <div className='flex items-center gap-2'>
 <p>Explore Full Catalogue</p>
<FaArrowRight/>
 </div>
  </CTAButton>)}


{token?(<button className='text-center text-[11px] lg:text-[16px]  bg-richblack-800 text-white hover:scale-95 transtion-all duration-200 px-4 py-2 lg:px-6 lg:py-3  rounded-md font-bold '><div className="flex items-center gap-2 lg:gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
                  Learn More
                  <FaArrowRight />
                </div></button>):(<CTAButton active={false} linkto="/signup">
Learn More
   </CTAButton>)}

  </div>
 </div>
</div>

<div className='mx-auto w-11/12 max-w-max-Content flex flex-col items-center justify-center '>
 <div className='flex flex-col lg:flex-row lg:gap-40 gap-10  lg:mb-10 lg:mx-20  mt-10 mt-[110px] '>
  <div className='lg:text-4xl lg:ml-20 font-semibold lg:w-[45%] text-3xl  '>
  Get the Skills You need for a 
  <HighlightText text={" Job That Is In Demand "}/>
  </div>
   <div className='flex flex-col  lg:gap-18 lg:w-[70%] text-black '>
     <div className="text-[16px] mb-10  ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
     </div>
     {token?(<button className='text-center text-[13px]  sm:text-[16px]  bg-yellow-50 max-w-max text-black px-6 py-3 mb-10 rounded-md font-bold '><div className="flex items-center gap-3" onClick={()=>navigate("/dashboard/my-profile")}>
              Learn More
                  <FaArrowRight />
                </div>
                </button>):(<div className="mb-10 w-[170px] "><CTAButton active={true} linkto="/signup" >
 <div className='flex items-center gap-2'>
 <p> Learn More</p>
<FaArrowRight/>
 </div>
  </CTAButton></div>)}
              </div>
            </div>
   <TimelineSection/>
  <LearningLanguageSection/>
 </div>
</div>


 <div className="relative mx-auto  my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8  bg-richblack-900 text-white">
 <InstructorSection />
 </div>
 <div  className='bg-richblack-900 my-20 text-white mx-auto w-11/12    gap-8'>
  <h1 className='text-center text-4xl font-semibold my-10'>Review From Other Learners</h1>
 <ReviewSlider/>
 </div>

      <Footer />
    </div>
  )
}

export default Home
