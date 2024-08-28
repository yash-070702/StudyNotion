import React, { useEffect, useState } from 'react'
import RatingStars from '../HomePage/Common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
        // console.log(course,"mai hu course data");
    },[course])


    
  return (
    <div className="overflow-hidden ">
      <Link to={`/courses/${course._id}`}>
        <div className="w-[250x] mx-4 lg:mx-0 ">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`lg:${Height} h-1/6 w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-5">
              {course.instructor.firstName} {course.instructor.lastName} 
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Course_Card

