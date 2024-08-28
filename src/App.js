import {Route, Routes } from "react-router-dom";
import './App.css';
import  Home from "./pages/Home";
import Navbar from "./components/core/HomePage/Common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import PrivateRoute from "./components/core/HomePage/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index"
import { ACCOUNT_TYPE } from "./utils/constant";
import { useSelector } from "react-redux";
import Settings from "./components/core/Dashboard/Settings";
import AddCourse from "./components/core/Dashboard/AddCourse" 
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import { useEffect } from "react";
import { useState } from "react";
import VideoDetails from "./components/core/viewCourse/VideoDetails";
import ViewCourse from "./pages/viewCourse";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import LogoPreloader from "./components/core/HomePage/Common/Preloader";
function App() {
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(true);
  const [refreshLoading,setRefreshLoading]=useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false); // Hide the preloader once everything is loaded
    };

    // Check if the DOM is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad); // Add event listener for window load
    }

    return () => {
      window.removeEventListener('load', handleLoad); // Clean up the event listener
    };
  }, []);
  useEffect(() => {
   
    setTimeout(() => {
      setRefreshLoading(false);
    }, 2000); 
  }, []);
  return (
   
   <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
  {loading || refreshLoading ?<LogoPreloader/>:<div>
    <Navbar className=""/>
  
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/catalog/:catalogName" element={<Catalog/>}/>
    <Route path="/courses/:courseId" element={<CourseDetails />} />
    <Route path="/signup" element={ <Signup />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/update-password/:id" element={<UpdatePassword />}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/verify-email" element={<VerifyEmail/>}/> 
    <Route path="/about" element={<About/>}/>   
    <Route path="/contact" element={<Contact/>}/> 
    <Route 
    element={ 
      <PrivateRoute> 
      <Dashboard/>
      </PrivateRoute>

    }
  >
  
    <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
    <Route path="dashboard/Settings" element={<Settings />} />

    {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route path="dashboard/cart" element={<Cart />} />
        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
        </>
      )
    }
    {
      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <>
        <Route path="dashboard/add-course" element={<AddCourse />} />
        <Route path="dashboard/instructor" element={<Instructor />} />
        <Route path="dashboard/my-courses" element={<MyCourses />} />
        <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}/>
        </>
      )
    }

  </Route>

  <Route element={
      <PrivateRoute>
        <ViewCourse />
      </PrivateRoute>
    }>

    {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route 
          path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
          element={<VideoDetails />}
        />
        </>
      )
    }

    </Route>

     <Route path="*" element={<Error />} />
  </Routes>
  </div>} 
  
   </div>
  );
}

export default App;
