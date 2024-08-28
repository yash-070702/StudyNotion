const jwt =require("jsonwebtoken");
require("dotenv").config();

const User=require("../models/User");

//auth
exports.auth = async (req, res, next) => {
	try {
	  // Extract JWT token from cookies, body, or header
	  const token = 
		req.cookies.token ||
		req.body.token ||
		(req.header("Authorization") && req.header("Authorization").replace("Bearer ", "").trim());
  
	  // If JWT is missing, return response
	  if (!token) {
		return res.status(401).json({ success: false, message: "Token Missing" });
	  }
  
	  try {
		// Verifying the JWT token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded);
		req.user = decoded; // Attach decoded user information to the request object
		next();
	  } catch (error) {
		return res.status(401).json({ success: false, message: "Token is invalid" });
	  }
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: "Something went wrong while validating the token",
	  });
	}
  };

//isStudent

exports.isStudent = async (req, res, next) => {
	try {

		if (req.user.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false,
                 message: `User Role Can't be Verified` });
	}
};

exports.isInstructor = async (req, res, next) => {
	try {

		if (req.user.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor only",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false,
                 message: `User Role Can't be Verified` });
	}
};

exports.isAdmin = async (req, res, next) => {
	try {

		if (req.user.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin only",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false,
                 message: `User Role Can't be Verified` });
	}
};
