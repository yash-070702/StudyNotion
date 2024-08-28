import React, { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
  ];

const ExploreMore = () => {
    const [currentTab,setCurrentTab]=useState(tabsName[0]);
    const [courses,setCourses]=useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

    const setMyCards=(value)=>{
        setCurrentTab(value);
        
        const result=HomePageExplore.filter((courses)=>
            courses.tag===value   
            
        )
            setCourses(result[0].courses);
            setCurrentCard(undefined);
      
    }

  return (
    <div className='flex  mt-10 md:mt-20 flex-col relative '>
      <div className='text-3xl mx-2  lg:text-4xl font-semibold text-white text-center'>Unclock The 
      <HighlightText text={" Power of Code "}/>
      </div>
      <p className='text-center text-richblack-300 text-md font-semibold  mt-3 mx-2 '>Learn to build Anything you can imagine</p>

      <div className='flex flex-row rounded-full bg-richblack-800 max-w-content mx-auto  mt-10 border-2 border-richblack-600'>
      {
        tabsName.map((element,index)=>{
return(
      <div className={` text-[10px]  lg:text-[16px] flex flex-row  items-center gap-5 ${currentTab===element ? "bg-richblack-900 text-richblack-5  lg:font-medium":"text-richblack-200"} rounded-full transtion-all duration-200  hover:text-richblack-5 px-2 text-center  lg:px-5 py-2 lg:py-3`} key={index}
       onClick={()=>setMyCards(element)}>{element}</div>

)    })
      }
      </div>
 
      <div className="gap-10 items-center lg:gap-20 flex mt-20  lg:justify-center flex-col lg:flex-row  text-black lg:mb-10 mb-7 lg:px-0 px-3 mx-auto lg:mr-10">

        {
        courses.map((element,index)=>{
            return (
                <CourseCard
                    key={index}
                    cardData={element}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                />
            )
        })
      }
      </div>
    </div>
  )
}

export default ExploreMore
