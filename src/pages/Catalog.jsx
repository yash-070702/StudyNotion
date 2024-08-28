import React, { useEffect, useState } from 'react'
import Footer from '../components/core/HomePage/Common/Footer'
import { categories } from '../services/apis'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { getCatalogaPageData } from '../services/operations/pageAndComponentData'
import { useSelector } from 'react-redux'
import Course_Card from '../components/core/Catalog/Course_Card'
import CourseSlider from '../components/core/Catalog/CourseSlider';


const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                // console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && catalogPageData?.data?.courses?.length===0) {
        return(
        <div className='flex justify-center h-[91vh] w-full items-center lg:text-3xl text-md text-center text-white'>
      NO COURSES FOUND FOR THIS CATEGORY
      </div>
        )
      }
    
      return (
        <div className=''>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab lg:px-4 py-12 lg:max-w-maxContent">
            <div className="text-2xl font-bold text-richblack-5 px-1 lg:px-0 lg:text-4xl">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`lg:px-4 px-2 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populor
              </p>
              <p
                className={`px-4  py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              /> 
            
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab lg:px-4 py-12 lg:max-w-maxContent">
            <div className="text-2xl font-bold text-richblack-5 px-4 lg:px-0 lg:text-4xl">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab text-white lg:px-4 py-12 lg:max-w-maxContent">
            <div className="text-2xl px-4 lg:px-0  font-bold text-richblack-5 lg:text-4xl">Frequently Bought</div>
            <div className="py-8">
              <div className="grid  grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[250px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </div>
      )
    }
    
    export default Catalog