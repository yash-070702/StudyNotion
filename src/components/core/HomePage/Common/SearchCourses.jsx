import React from 'react'
import { courseEndpoints } from "../../../../services/apis";
import { Link, useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';
import { IoMdSearch } from "react-icons/io";
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import useOnClickOutside from "../../../../hooks/useOnClickOutside"
import {apiConnector} from "../../../../services/apiconnector";

const SearchCourses = () => {
    const [loading, setLoading] = useState(false)
const [allCourses,setAllCourses]=useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [open, setOpen] = useState(false)
const [results, setResults] = useState([]);
const navigate = useNavigate();
const ref = useRef(null)
const [openInputField,isOpenInputField]=useState(false)

useOnClickOutside(ref, () => {
    setSearchTerm("")
     isOpenInputField(false)
  setOpen(false)
}
    
)

    const fetchAllcourses= async()=>{
        setLoading(true);
        try{
          const result = await apiConnector("GET",courseEndpoints.GET_ALL_COURSE_API);
           setAllCourses(result.data.data);
            }
            catch(error){
          console.log("Could not fetch the course list");
            }
            setLoading(false);
        }

        useEffect(()=>{
            fetchAllcourses();
           
           },[]);
           useEffect(() => {
      
            const fuse = new Fuse(allCourses, {
              keys: [{name:'courseName'},
                {name:'instructor.firstName'},
                {name:'instructor.lastName'},
                {name:'category.name'},
                ], // Adjust based on your data structure
              threshold: 0.7,
            });
          
            if (searchTerm) {
              const searchResults = fuse.search(searchTerm);
              setResults(searchResults.map(result => result.item));
            } 
          
          }, [searchTerm, allCourses]);
          
          
          // console.log(allCourses);

   
      
  return (
<div>


<div className="hidden lg:block mr-7">
<input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => {setOpen(true)
            console.log("mai hu ",open)}}
            className="w-full outline-none  rounded-2xl border-richblack-400 border bg-richblack-800 px-[12px] py-1 text-richblack-5"  
       ref={ref}
      />
   

   {/* {searchTerm &&(   <div className="text-white z-[1000]  absolute top-[8%] left-[0%] lg:left-[68%] mx-3 rounded-lg w-11/12 lg:w-[220px] lg:top-[9%]  bg-richblack-700" 
        onClick={(e) => e.stopPropagation()}  ref={ref}>

        {open ?(<div className="py-2 pr-9" ref={ref}  onClick={(e) => e.stopPropagation()} >{results.length?(results.map((item, index) => 
            <Link to={`/courses/${item._id}`}  onClick={()=>
           { 
            setOpen(false)
            isOpenInputField(false)
          setSearchTerm("");
    
           }}  > 
             <li key={index} className=" my-3 ml-3  flex items-center gap-2 hover:text-richblack-50 hover:cursor-pointer"
      
          
          >
          <IoMdSearch />

            {item.courseName} 
          </li></Link>
        )):(<div className="py-2 px-7 text-center">No Result Found</div>) }</div>):(<div></div>)}
      </div>)} */}
     
    </div>



{/* UI for mobile view */}

    <div className=''>
    <div className='lg:hidden bg-richblack-500 p-[3px] rounded-full' onClick={()=>{isOpenInputField(!openInputField)
    console.log(openInputField)}}>
    <IoMdSearch color="white" size={25} />
    </div>

{openInputField&&(    <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => {setOpen(true)
            console.log("mai hu ",open)}}
     className={` outline-none ${openInputField?"block":"hidden"} absolute w-full top-[2%] left-[0%] z-[1000]   rounded-2xl border-richblack-400 border bg-richblack-800 px-[12px] py-1 text-richblack-5`}
       ref={ref}
      />)}


{searchTerm &&(   <div className="text-white z-[1000]  absolute top-[8%] left-[0%]  mx-3 rounded-lg w-11/12 lg:w-[98%] lg:top-[9%]  bg-richblack-700" 
        onClick={(e) => e.stopPropagation()}  ref={ref}>

        {open ?(<div className="py-2 pr-9">{results.length?(results.map((item, index) => 
            <Link to={`/courses/${item._id}`}  onClick={()=>
           { 
            setOpen(false)
            isOpenInputField(false)
          setSearchTerm("");
    
           }}  > 
             <li key={index} className=" my-3 ml-3  flex items-center gap-2 hover:text-richblack-50 hover:cursor-pointer"
      
          
          >
          <IoMdSearch />

            {item.courseName} 
          </li></Link>
        )):(<div className="py-2 px-7 text-center">No Result Found</div>) }</div>):(<div></div>)}
      </div>)}
    
    </div>
   
    </div>


  )
}

export default SearchCourses
