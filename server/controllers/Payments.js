const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto")
const mongoose = require("mongoose")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const currency="INR";

  const options = {
    amount: total_amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}

// this complete method is for only one payment and this method is done by using web hook

// //capture the payment and initiate the razorpay order
// exports.capturePayment=async(req,res)=>{

//     //get course id 
//     const {course_id}=req.body;
//     const userId=req.user.id;


//     //valid courseId
//     if(!course_id){
//         return res.json({
//             success:false,
//             message:"Please provide valid course Id",
//         })
//     };

//     //valid coursedetails
//     let course;
//     try{
// course=await Course.findById(course_id);

// if(!course){
//     return res.json({
//         success:false,
//         message:"Could't find the course",
//     });
// }

// //check wheather the studnet is already enrolled or not for same copurse

// const uid=new mongoose.Types.ObjectId(userId);  //currently userid is a string format we are converting it into objecct id form

// if(course.studentsEnrolled.includes(uid))
//     {
//         return res.status(404).json({
//             success:false,
//             meaasge:"Student is Already enrolled",
//         })
//     }
//     }
//     catch(error){
// console.error(error);
// return res.status(500).json({
//     success:false,
//     message:error.message,

// }); 
//     }

//     //create order
//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         reciept:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     }; 
//     try{
// //initiate the payment using razorpay (creation)
// const paymentResponse=await instance.orders.create(options);
// console.log(paymentResponse);
// return res.status(200).json({
//     success:true,
//     courseName:course.courseName,
//     courseDescription:course.courseDescription,
//     thumbnail:course.thumbnail,
//     orderId:paymentResponse.id,
//     currency:paymentResponse.currency,
//     amount:paymentResponse.amount,
// })
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//     });
// }
// }

// //verify signature of razorpay and server

// exports.verifySignature=async(res,req)=>{
//     const webhookSecret="12345678";  //ye vo secret key h jo hm razorpay ko bhj rhe h 

//     const signature=req.headers["x-razorpay-singature"]; // ye vo secret h jo razorpay hme bhj rha h 

//     //dekho jo mjhe razorpay ne secret bhja hai use m decypt nhi kr skta to ab match kaise kre,
//     //uske lie m apni webhook secret ko to convert kr skta hu hashing se ek secret code m jisse dono compare ho jaee
//     //to jo niche k 3 line hai vo conversion krne ke kaam m aar hi h mere webhook ko ek hashed form m jisse hm use jo secret key razopay ki trf se aai h usse compare krra ske 

//     const shasum=crypto.creatHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(digest===signature)
//         {
//             console.log("Payment is Authorised");
//             const{courseId,userId}=req.body.payload.payment.entity.notes;

//             try{
// //now find the course and enrolled the student in course
// const enrolledCourse=await Course.findOneAndUpdate(
//     {_id:courseId},
//     {$push:{
//         studentsEnrolled:userId
//     }},
//     {new:true},
// );
// if(!enrolledCourse){
//     return res.status(404).json({
//         success:false,
//         message:"Course not found",
//     })
// };
// console.log(enrolledCourse);

// //find the studnet and add the course in enrolledcourses if that student

// const enrolledStudent=await User.findOneAndUpdate({
//     _id:userId
// },
// {$push:{course:courseId}},
// {new:true}
// );
//  console.log(enrolledCourse);
//  // ab student ke pass mail jayegi ki app enrolled ho jayegi

//  const emailResponse=await mailSender(enrolledStudent.email,
//     "Congratulations from Y.Aggarwal",
//     "congatulations, you are successfully registered"
//  );
//  console.log(emailResponse);

//  return res.status(200).json({
//     success:true,
//     message:"Singnature verifeid and course added,"
//  });
//             }
//             catch(error)
//             {
// return res.status(200).json({
//     success:false,
//     message:error.message,
// })
//             }
//         }

//         else{
//             return re.status(400).json({
// success:false,
// message:"Invalid Request",
//             })
//         }

// } 