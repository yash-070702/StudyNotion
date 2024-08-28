import React from 'react'
import Carousel from 'react-multi-carousel';
import ReactStars from "react-rating-stars-component"
import { FaStar } from "react-icons/fa"
import 'react-multi-carousel/lib/styles.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiConnector } from '../../../../services/apiconnector';
import { ratingsEndpoints } from '../../../../services/apis';
const ReviewSlider = () => {
    const [reviews, setReviews] = useState([])
    const truncateWords = 20;
    useEffect(() => {
        const fetchAllReviews=async () => {
          const  {data}  = await apiConnector(
            "GET",
            ratingsEndpoints.REVIEWS_DETAILS_API
          )
             if(data?.success){
            setReviews(data.data);
             }

        }
        fetchAllReviews();
      }, [])

    return (
      
        <div>
 {reviews?.length?(
 <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={4000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={50}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      
        itemClass="flex justify-center items-center"
      >  
        {reviews?.map((review, i) => (
         
          <div className="flex flex-col mx-10 md:mx-0 rounded-md md:h-[230px] gap-3 bg-richblack-800 p-3 lg:p-5 lg:w-[390px] text-[14px] text-richblack-25" key={i}>
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10  rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold md:text-[1.5rem] text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                      <h2 className="text-[12px] font-medium text-richblack-5">
                       BY - {review?.course?.instructor.firstName}  {review?.course?.instructor.lastName} 
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
                 ))} 
      
     
       </Carousel> 
             ) : (
              <p className="text-xl text-center text-richblack-5">No Reviews Found</p>
            )}   
          </div> 
        )
}

export default ReviewSlider
