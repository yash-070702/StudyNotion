import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import {RiDeleteBin6Line} from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {
const dispatch=useDispatch();
    const {cart}=useSelector((state)=>state.cart)
    return (
        <div className="flex flex-1  flex-col mb-10">
          {cart.map((course, indx) => (
            <div
              key={course._id}
              className={`flex flex-col md:flex-row w-full flex-wrap bg-richblack-600 rounded-md md:pb-0 md:bg-transparent  items-center md:items-start justify-between gap-6 ${
                indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
              } ${indx !== 0 && "mt-6"} `}
            >
              <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                <img
                  src={course?.thumbnail}
                  alt={course?.courseName}
                  className=" w-full h-[300px] md:h-[148px] md:w-[220px] p-4 md:p-0 rounded-lg object-cover"
                />
                <div className="flex flex-col  items-center space-y-1">
                  <p className=" text-2xl md:text-lg font-medium text-richblack-5">
                    {course?.courseName}
                  </p>
                  <p className="text-sm text-richblack-300">
                    {course?.category?.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-5">4.5</span>
                    <ReactStars
                      count={5}
                      value={course?.ratingAndReviews?.length}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaRegStar />}
                      fullIcon={<FaStar />}
                    />
                    <span className="text-richblack-400">
                      {course?.ratingAndReviews?.length} Ratings
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex md:flex-col gap-32 md:gap-0 md:items-end space-y-2">
                <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  className="flex items-center gap-x-1 rounded-full md:rounded-md border border-richblack-600 text-lg md:text-[14px]  bg-richblack-700 py-3 px-[12px] text-pink-200"
                >
                  <RiDeleteBin6Line />
                  <span className='hidden md:block'>Remove</span>
                </button>
                <p className="mb-6 text-3xl font-medium text-yellow-100">
                  ₹ {course?.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )
}

export default RenderCartCourses
