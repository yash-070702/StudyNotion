import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

 import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";
 import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar";

import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
       console.log("Course Data here... ", courseData)
      dispatch(setCourseSectionData(courseData.courseDetails?.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div className="h-[90%] ">
      <div className="relative hidden sm:flex  overflow-none   min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] mt-4  flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>

* <div className="relative flex sm:hidden mt-10 sm:mt-0 flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="h-[calc(100vh-4.5rem)] flex-1 overflow-auto">
          <div className="mx-1">
            <Outlet />
          </div>
        </div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      
      </div> 
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}