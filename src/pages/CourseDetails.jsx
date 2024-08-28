import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import  ReactMarkdown  from "react-markdown"
import { formatDate } from "../services/formatDate"
import RatingStars from "../components/core/HomePage/Common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import GetAvgRating from "../utils/avgRating";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import Error from "../pages/Error"
import { MdOutlineLaptopWindows } from "react-icons/md"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import toast from "react-hot-toast"
import convertSecondsToDuration from "../utils/convertSecondsToDuration"
import Footer from "../components/core/HomePage/Common/Footer"
import ConfirmationModal from "../components/core/HomePage/Common/ConfirmationModal"
import { addToCart } from "../slices/cartSlice"
import copy from "copy-to-clipboard"
import { FaShareSquare } from "react-icons/fa"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FiEdit2 } from "react-icons/fi"
import { ACCOUNT_TYPE } from "../utils/constant"
import CourseReviews from "../components/core/HomePage/Common/CourseReviews"
import CourseFeatures from "../components/core/HomePage/Common/CourseFeatures"
const CourseDetails = () => {
const {user} = useSelector((state)=>state.profile);
const {token} = useSelector((state)=>state.auth);
const {loading}=useSelector((state)=>state.profile);

const { paymentLoading } = useSelector((state) => state.course)

const dispatch = useDispatch();
const navigate = useNavigate();
const {courseId} = useParams();

// Declear a state to save the course details
const [response, setResponse] = useState(null)
const [confirmationModal, setConfirmationModal] = useState(null)
const [courseReviews,setCourseReviews]=useState(null);
const [totalDuration, setTotalDuration] = useState(0);
const [isActive, setIsActive] = useState(Array(0))
const handleActive = (id) => {
  // console.log("called", id)
  setIsActive(
    !isActive.includes(id)
      ? isActive.concat([id])
      : isActive.filter((e) => e != id)
  )
}

useEffect(() => {
  // Calling fetchCourseDetails fucntion to fetch the details
  (async () => {
    try {
      const res = await fetchCourseDetails(courseId)
       //console.log("course details res: ", res)
      setResponse(res);
      setCourseReviews(res?.data?.ratingAndReviews)
    } catch (error) {
      console.log("Could not fetch Course Details")
    }
  })()
}, [courseId])


//  console.log("response data: ", response)

// Calculating Avg Review count
const [avgReviewCount, setAvgReviewCount] = useState(0)
useEffect(() => {
  const count = GetAvgRating(response?.data?.ratingAndReviews)
  setAvgReviewCount(count)
}, [response])

useEffect(() => {
  let duration = 0;

  response?.data?.courseContent.forEach((section) => {
   
    section.subSection.forEach((lecture) => {
      duration+=parseInt(lecture.timeDuration);
      
    });
  });
  duration=convertSecondsToDuration(duration);

  setTotalDuration(duration);
  // console.log(duration)
}, [response]);



const handleShare = () => {
  copy(window.location.href)
  toast.success("Link copied to clipboard")
}



// Total number of lectures
const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
useEffect(() => {
  let lectures = 0
  response?.data?.courseContent?.forEach((sec) => {
    lectures += sec.subSection.length || 0
  })
  setTotalNoOfLectures(lectures)
}, [response])

if (loading || !response) {
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="spinner"></div>
    </div>
  )
}
if (!response.success) {
  return <Error />
}

const {
  _id: course_id,
  courseName,
  courseDescription,
  thumbnail,
  price,
  whatYouWillLearn,
  courseContent,
  ratingAndReviews,
  instructor,
  studentsEnrolled,
  createdAt,
} = response.data
;



const handleBuyCourse = () => {
  if(token && user?.accountType === "Student" ){
      buyCourse(token,[courseId],user,navigate,dispatch);
      return ;
  }
  if(token && user?.accountType !== "Student" ){
   toast.error("Only Student Is Allow To Buy Course");
    return ;
}

  setConfirmationModal({
    text1: "You are not logged in!",
    text2: "Please login to Purchase Course.",
    btn1Text: "Login",
    btn2Text: "Cancel",
    btn1Handler: () => navigate("/login"),
    btn2Handler: () => setConfirmationModal(null),
  })
}

const handleAddToCart=()=>{
  if(token && user?.accountType === "Student" ){
    dispatch(addToCart(response))
    return ;
}
if(token && user?.accountType !== "Student" ){
 toast.error("Only Student Is Allow To Buy Course");
  return ;
}

setConfirmationModal({
  text1: "You are not logged in!",
  text2: "Please login to Add Course to Cart.",
  btn1Text: "Login",
  btn2Text: "Cancel",
  btn1Handler: () => navigate("/login"),
  btn2Handler: () => setConfirmationModal(null),
})
}
  return (
    <div className="">
       <div className={` w-full  bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px]">
          <div className="mx-auto grid min-h-[300px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className=" bottom-0 left-0  w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            
            </div>
            <div
              className={`z-30 my-5  flex flex-col gap-4 py-8 text-lg text-richblack-5`}
            >
              <div className="flex flex-col gap-10 md:flex-row lg:gap-[400px] lg:justify-center lg:items-center">
                <p className="text-3xl overflow-hidden  font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
          {user?.accountType===ACCOUNT_TYPE.INSTRUCTOR?( <div
               onClick={() => {
                        navigate(`/dashboard/edit-course/${course_id}`)
                      }}>
               <FiEdit2 size={25}
                style={{  strokeWidth: 3 }}
               />
                </div>):(<div></div>)}     
              </div>
              <p className={`text-richblack-200 lg:w-[80%]`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>1000+ students enrolled</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3  text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <p className="text-white text-center ">30-Day Money-Back Guarantee</p>
              <button
              className="yellowButton"
              onClick={
                user && response?.data?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && response?.data?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !response?.data?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="blackButton">
                Add to Cart
              </button>
            )}
            
            <div className={``}>
            <p className={`my-2 text-white text-xl font-semibold `}>
                Prerequisited / Instructions :
            </p>
            <div className="flex  flex-col gap-0 text-sm text-caribbeangreen-100">
              {response?.data?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>

            <button
              className="mx-auto flex items-center gap-2 pt-4 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="-right-[4rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] lg:translate-y-10 md:translate-y-0 lg:absolute -translate-x-36  lg:block">
            <CourseDetailsCard
              course={response?.data}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>
          
          <CourseFeatures/>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex flex-col lg:flex-row gap-2">
                  <span>
                  {`section(s)`} : {courseContent.length} 
                  </span>
                  <span>
                  {`lecture(s)`} : {totalNoOfLectures} 
                  </span>
                  <span>Total Duration : {totalDuration} </span>
                </div>
                <div>
                   <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  > 
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
            
            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
          </div>
         <div className="mt-10 px-3 pb-5 flex flex-col gap-1 rounded-xl  bg-richblack-700">
          <h1 className="text-3xl font-bold mb-4 mt-4">Author</h1>
          <div className="flex gap-3 items-center">
          <img src={response?.data?.instructor?.image}
            width={60}
            className="rounded-full"
          />
          <p className="text-[1.2rem]">{response?.data?.instructor?.firstName} {response?.data?.instructor?.lastName}</p>
          </div>
        <p className="text-richblack-100"> {response?.data?.instructor?.additionalDetails?.about}</p>
         </div>
       </div>

       <div className=" pb-10">
          <h1 className='text-center text-3xl md:text-4xl font-semibold my-10'>Reviews For This Course</h1>
          <CourseReviews courseReviews={courseReviews} courseName={courseName} instructor={instructor}/>
          </div>
      </div>
   <Footer/>
   {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
 
  )
}

export default CourseDetails
