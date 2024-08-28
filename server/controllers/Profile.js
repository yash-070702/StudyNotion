const Profile =require("../models/Profile");
const User=require('../models/User');
const RatingAndReviews=require("../models/RatingAndReview");
const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const {uploadImageToCloudinary}=require("../utils/imageUploader")
const Course=require("../models/Course");
const mongoose = require('mongoose');

exports.updateProfile=async(req,res)=>{
    try{
const {firstName = "",lastName = "",dateOfBirth="",about="",contactNumber="",gender=""}=req.body;

//get userid
const id=req.user.id;

//validation
if(!contactNumber || !gender || !id){
    return res.status(400).json({
        success:false,
        message:'Enter the required fields',
    });
}

 // Find the profile by id
 const userDetails = await User.findById(id)
 const profile = await Profile.findById(userDetails.additionalDetails);
 console.log(profile);

 const user = await User.findByIdAndUpdate(id, {
  firstName,
  lastName,


})

await user.save()

//update the profile details
profile.dateOfBirth = dateOfBirth;
profile.about = about;
profile.ContactNumber = contactNumber;
profile.gender = gender;

await profile.save();

   // Find the updated user details
   const updatedUserDetails = await User.findById(id)
   .populate("additionalDetails")
   .exec()


return res.status(200).json({
    success:true,
    message:"Profile Updated Successfully",
    updatedUserDetails,
})
    }

    catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteAccount = async(req,res)=>{
    try{
// jb hm delete krnge to hme 2 baar delete krna padega ek barr to user ka profile bni hui h vo delete krni h aur vo jo additional details walio profile bni h vi bhi ldete krni h 

const id=req.user.id;

//validation
const userDetails=await User.findById(id);
if(!userDetails){
    return res.status(404).json({
        success:false,
        message:"User Not Found",
    })
}

//delete profile
await Profile.findByIdAndDelete(
    {
        _id:userDetails.additionalDetails
    }
)
// delete user
await User.findByIdAndDelete(
    {
        _id:id
    }
)

RatingAndReviews.deleteMany({
   user: new mongoose.Types.ObjectId(id)
  })
  .then((result) => {
    console.log(`${result.deletedCount} documents deleted.`);
  })
  .catch((error) => {
    console.error('Error deleting documents:', error);
  });

//return response
return res.status(200).json({
    success:true,
    message:"User Deleted Successfully"
})
    }
    catch(error){
return res.status(404).json({
    success:false,
    message:error.message,
})
    }
}


exports.getAllUserDetails=async (req,res)=>{
    try{
 //get id 
 const id=req.user.id;

 //validation and get user details
 const userDetails = await User.findById(id)
 .populate("additionalDetails")
 .exec()
console.log(userDetails)
res.status(200).json({
 success: true,
 message: "User Data fetched successfully",
 data: userDetails,
})
} catch (error) {
return res.status(500).json({
 success: false,
 message: error.message,
})
}
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000,
      80
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getEnrolledCourses= async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message:error.message })
  }
}