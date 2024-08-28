const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt = require('bcryptjs');
const crypto = require("crypto")

//resetPasswordToken
exports.resetPasswordToken=async(req,res)=>{
      try{
//get email from req body
const email=req.body.email;

// check user with is mail exist or not 
const user=await User.findOne({email:email});

if(!user){
  return res.json({
      success:false,
      message:"Your entered email is not registered with us",
  });

}
//generate token
const token =crypto.randomUUID();

//updtae user by adding token and expiry time 
const updatedDetails=await User.findOneAndUpdate(
                              {email:email},
                              {
                                  token:token,
                                  resetPasswordExpires:Date.now() + 5*60*1000,

                              },
                              {new:true}
                               );
console.log("DETAILS", updatedDetails);
//create url
const url=`http://localhost:3000/update-password/${token}`

//send mail containing the url
await mailSender(email, 
"Password Reset Link",
`Password Reset Link:${url}`
)

//return response
return res.json({
success:true,
message:"Email sent Successfully,please check email and change Password",
})
      }
      catch(error){
return res.status(500).json({
    success:false,
    message:"Something went wrong",
})
      }
}

exports.resetPassword=async(req, res)=> {
try{
        // fetch data 
        const { password, confirmPassword, token } = req.body;

        //check cofirm password and password
        if (confirmPassword !== password) {
            return res.status(500).json({
                success: false,
                message: "Password And Confirm Password didinot match",
            });
        }
        const userDetails = await User.findOne(
            { token: token }
        );
    
        //get user details using token from body
        if (!userDetails) {
            return res.json({
                success: false,
                message: "Invalid toekn",
            });
    
        }
          //token time check
          if (userDetails.resetPasswordExpires< Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired ,please generate new token",
            });
        }
    
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        //password update in db 
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Something went wrong in reseting of password",
    })
}
}