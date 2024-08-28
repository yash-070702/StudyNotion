import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react"
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa"
import convertSecondsToDuration from "../../../../utils/convertSecondsToDuration";
import { FiEdit2 } from "react-icons/fi"
import { formatDate } from "../../../../services/formatDate";
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { setCourse } from "../../../../slices/courseSlice";
import { setEditCourse } from "../../../../slices/courseSlice";
import { deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constant";
import ConfirmationModal from "../../HomePage/Common/ConfirmationModal";

const CoursesTable = ({courses,setCourses}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [totalDuration, setTotalDuration] = useState(0);
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30
  
    const handleCourseDelete = async (courseId) => {
      setLoading(true)
      await deleteCourse({ courseId: courseId }, token)
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
      setConfirmationModal(null)
      setLoading(false)
    }
  
     console.log("All Course ", courses);


  
    return (
      <>
      <div className="block md:hidden flex flex-col items-center">
        {courses?.length===0?(<p>No Courses Found</p>):(
          courses.map((course,index)=>{
            let duration=0;
        
course.courseContent.forEach((section) => {
   
   section.subSection.forEach((lecture) => {
     duration+=parseInt(lecture.timeDuration);
     
   });
 })
 duration=convertSecondsToDuration(duration);
 {/* setTotalDuration(duration); */}
            return(
              <div key={index} className="mb-10 flex flex-col items-center self-center rounded-lg bg-richblack-700 w-[95%] ">
           <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="w-[95%] mt-3 rounded-xl object-cover"
                    onClick={()=> navigate(`/courses/${course._id}`)}
                    />
                     <p className="text-xl font-semibold mt-3 text-richblack-5"
                      onClick={()=> navigate(`/courses/${course._id}`)}>
                        {course.courseName}
                       
                        </p>
                        <p className="text-[14px] text-center mx-1 text-richblack-300"
                        onClick={()=> navigate(`/courses/${course._id}`)}>
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-[15px] mt-1 text-white">
                        Created: {formatDate(course.createdAt)}
                      </p>
                      <div className="text-white flex gap:2 justify-between mt-3">Total Duration : <span>{duration}</span></div>

                    
                      <div className="text-white">
                      <span>Amount : </span>
                      <span className="text-yellow-50  font-bold">
                      ₹{course.price}
                      </span>
                       </div>
                       <div className="text-white flex justify-around my-4  w-[90%]">
                       {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-900 px-3 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          Drafted
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-900 px-3 py-[2px] text-[12px] font-medium text-yellow-100">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </div>
                          Published
                        </p>
                      )}
                      <div>
                      <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                      </div>
                       </div>
                 

           </div>)
           
        })
        )}
      </div>
        <Table className="rounded-xl hidden md:block border border-richblack-800 ">
          <Thead className="">
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
              <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Courses
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Duration
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Price
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                  No courses found
                  {/* TODO: Need to change this state */}
                </Td>
              </Tr>
            ) : (
              courses?.map((course) => {
                let duration=0;
        
        course.courseContent.forEach((section) => {
           
           section.subSection.forEach((lecture) => {
             duration+=parseInt(lecture.timeDuration);
             
           });
         })
         duration=convertSecondsToDuration(duration);
              return(
                <Tr
                  key={course._id}
                  className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
                >
                  <Td className="flex flex-1 gap-x-4">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                      onClick={()=> navigate(`/courses/${course._id}`)}
                    />
                    <div className="flex flex-col justify-between" 
                    onClick={()=> navigate(`/courses/${course._id}`)}>
                      <p className="text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                      <p className="text-[12px] text-white">
                        Created: {formatDate(course.createdAt)}
                      </p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                          <HiClock size={14} />
                          Drafted
                        </p>
                      ) : (
                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                          <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                            <FaCheck size={8} />
                          </div>
                          Published
                        </p>
                      )}
                    </div>
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
               {duration}
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    ₹{course.price}
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100 ">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...  ",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </Td>
                </Tr>
              )
            })
            )}
          </Tbody>
        </Table>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </>
    )
  }
  

export default CoursesTable
