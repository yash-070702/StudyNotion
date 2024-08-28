import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
<div className={`${currentCard===cardData.heading?"bg-white shadow_for_explore_more text-black":"text-richblack-400"} mx-auto flex flex-col items-center lg:w-[28%] gap-3 mb-5 p-8 bg-richblack-800`} onClick={()=>setCurrentCard(cardData.heading)}>
<h1 className={`${currentCard===cardData.heading?" text-black":"text-white"} font-semibold`}>{cardData.heading}</h1>
 <p className="">{cardData.description}</p>
 <hr className=" mt-10 lg:mt-20"></hr>
 <div className="flex justify-between w-full ">
  <div className=" flex items-center gap-2 "><HiUsers/><p>Beginner</p></div>
  <div className=" flex items-center gap-2"><ImTree/>{cardData.lessionNumber} Lessons</div>
 </div> 
</div>
  );
};

export default CourseCard;