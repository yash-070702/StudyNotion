import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../HomePage/Common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import NestedView from './NestedView';
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useNavigate } from 'react-router-dom';

const CourseBuilderForm = () => {

const {
    register,
    handleSubmit,
    setValue,
    formState:{errors},
}=useForm();

const [editSectionName,setEditSectionName]=useState(null);
const {course}=useSelector((state)=>state.course);
const {token}=useSelector((state)=>state.auth);
const[loading,setLoading]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();

const cancelEdit=()=>{
setEditSectionName(null);
setValue("sectionName","");
}


 const goToMyCourses=()=>{
navigate("/dashboard/my-courses");
dispatch(setStep(1));
dispatch(resetCourseState());
 }


const onSubmit= async (data)=>{
setLoading(true);
let result;

if(editSectionName){
    result=await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId:course._id,
    },token
    )
}

else{
    result=await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
    },token)
}

if(result){
    dispatch(setCourse(result));
    setEditSectionName(null);
    setValue("sectionName","")
}
setLoading(false);
}

const goBack=()=>{
dispatch(setStep(1));
dispatch(setEditCourse(true));
}

const goToNext=()=>{
  console.log("mai aaya step 3 pr");
    if(course?.courseContent?.length===0){
        toast.error("Please add atleast one section");
        return;
    }

    else if(course.courseContent.some((section)=>section.subSection?.length===0)){
        toast.error("please add ateast one lecture in each section");
    return;
    }
   else{ dispatch(setStep(3));
    console.log("mai aaya step 3 pr");
}}


    const handleChangeEditSectionName=(sectionId,sectionName)=>{

if(editSectionName===sectionId){
    cancelEdit();
    return;
}

        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }
 
    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-3  md:p-6">
      <p className="text-2xl text-center md:text-start font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}
      className="space-y-4">
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full outline-none rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
          />
       {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-2">
            <IconBtn
            type="submit"
            text={editSectionName?"Edit Section Name":"Create Section"}
            outline={true}
            >  <IoAddCircleOutline size={20} className="text-yellow-50" /></IconBtn>

            {editSectionName&&(
                <button 
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'>
                    Cancel Edit
                </button>
            )}
        </div>
      </form>

      {course?.courseContent?.length>0 &&(
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      <div className='flex flex-col md:flex-row items-center gap-5 pb-5 md:pb-0 justify-between'> 

<div className='w-max-content'>
<IconBtn
        text="Continue Later"
        disabled={loading}
        onclick={goToMyCourses}
        > <MdNavigateNext /></IconBtn></div>
                <div className='flex w-full md:w-auto md:justify-end justify-around gap-x-3'>
        <button
        onClick={goBack}
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
Back
        </button>
        <button onClick={goToNext}
        className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] md:px-[20px] px-[10px]  font-semibold bg-yellow-50`}>Next
          <MdNavigateNext />
        </button>
       
         
      </div>
        </div>
      

    </div>
  )
}

export default CourseBuilderForm
