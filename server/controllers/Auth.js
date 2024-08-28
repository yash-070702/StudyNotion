const User=require("../models/User");
const Profile=require("../models/Profile")
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();


// logic to send otp

exports.sendotp=async(req,res)=>{

  try{
  //email lekr aao from req ki body se 
  const{email}=req.body;

  // ab phle check karo ki user exist to nhi krta hai
  const checkUserPresent=await User.findOne({email});
  
  //agr exist krdeta hai to bhaga do use khkr ki tum to phle se hi presnet ho bhai 
  if(checkUserPresent){
      return res.status(500).json({
          success:false,
          message:`User Already exist`,
      })
  }

  //now generate otp
  var otp= otpGenerator.generate(6,{
    upperCaseAlphabhets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
    digits:true,
  });
  console.log("OTP GENERATED",otp);

  //check that otp is unique is not 
  let result=await OTP.findOne({otp:otp});

// yhe jbtk otp generate karega tb tk unique na ban jae otp
  while(result){
    otp= otpGenerator.generate(6,{
        upperCaseAlphabhet:false,
        lowerCaseAlphabet:false,
        specialChars:false,
      });
      result=await OTP.findOne({otp:otp});
  }


  // ab db m entry bna rhe h 
const otpBody=await OTP.create({email,otp});
console.log(otpBody);

res.status(200).json({
    success:true,
    message:'OTP sent suucessfully',
    otp,
})
  }
  catch(error)
  {
 console.error(error);
 return res.status(500).json({
    success:false,
    message:error.message,
 })
  }
};


exports.signup=async(req,res)=>{
   
  try{
     //fetching data from req body
     const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      } = req.body;

      //validate krlo 

      if(!firstName || !lastName || !email || !confirmPassword || !password || !otp ){
        return res .status(403).json({
            success:false,
            message:"All fields are required",
        })
      }

      // check kro ki password and confirm password match krrre h ya nhi 
      if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and confirm password not match please try again"
        })
      }

      //check kro ki user exist krta hai 
      const existingUser=await User.findOne({email});
      if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User exist already"
        });
      }

      // ho skta hai ki user ne 2 baar otp generate krlia ho to mjhe lastets waala otp fetch krke lana hai database se 
const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);

// console.log(recentOtp);
console.log(recentOtp.otp);

//vaildate OTP 
if(recentOtp.length==0){
    return res.status(400).json({
        success:false,
        message:"OTP not found",
    })
}
else if(otp!==recentOtp[0].otp){
    //Invalid OTP
    return res.status(400).json({
        success:false,
        message:`Invalid  OTP`,
    });
}

//Hash password
const hashedPassword=await bcrypt.hash(password,10);

    // Create the user
    let approved = ""
    approved === "Instructor" ? (approved = false) : (approved = true)
    
 // Create the Additional Profile For User
 const profileDetails = await Profile.create({
    gender: null,
    dateOfBirth: null,
    about: null,
    contactNumber: null,
  })

// entry create in db

const user=await User.create({
     firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
})

return res.status(200).json({
    success:true,
    message:"User is Registered Sucessfully",
    user,
})
  }

  catch(error){
console.log(error);
res.status(500).json({
    success:false,
    message:error.message,
})
  }


}

exports.login=async(req,res)=>{
    try{
        // get data from req body
        const{email,password}=req.body;
        
        //validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required,please try again",
            });
        }
        // check user exist or not 
        const user=await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered,Please signup first",
            })
        }

        //password matching and creating jwt token 
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
          const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
          });  
          user.token=token,
          user.password=undefined;
          const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
          }

          //create cookie and send response
          res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged In successfully",
          })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            })
        }
    }
    catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:error.message,
})
    }
}

exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}

