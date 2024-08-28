const mongoose = require("mongoose")

// Define the Courses schema
const coursesSchema = new mongoose.Schema({
  courseName: {
     type: String ,
     required:true,
    },
  courseDescription: {
     type: String ,
     required:true,
    },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  whatYouWillLearn: {
    type: String,
    required:true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      // required:true,
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],

  price: {
    type: Number,
    required:true,
  },
  thumbnail: {
    type: String,
    required:true,
  },
   tag: {
    type: [String],
    required:true,
  },
  category: {
   type:mongoose.Schema.Types.ObjectId,
   ref:"Category",
  },
  studentsEnrolled: [
        {
          type: mongoose.Schema.Types.ObjectId,
          // required: true,
          ref: "User",
        },
      ],
      instructions: {
        type: [String],
      },

status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  createdAt:
   { type: Date, default: Date.now },
})

// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema)
