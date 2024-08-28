import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {


   
  return (
  <div className=' npm  overflow-y-hidden'>
      {Courses?.length ? (
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
  minimumTouchDrag={80}
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
>
{Courses?.map((course, i) => (
            <div className='mx-10' key={i}>
              <Course_Card course={course}  Height={"h-[250px]"} />
            </div>
          ))}

</Carousel>
      ) : (
        <p className="text-xl text-center text-richblack-5">No Course Found</p>
      )}
    </div>
  )
}

export default CourseSlider
