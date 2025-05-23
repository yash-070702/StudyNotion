const Category =require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
//create tag ka handler function

exports.createCategory=async (req,res)=>{
    try{
        //fetch data
const {name,description}=req.body;

//validaton 
if(!name || !description){
    return res.status(400).json({
        success:false,
        message:"All fileds are required",
    })
}
//cretae entry in db 
const CategoryDetails=await Category.create({
    name:name,
    description:description,
})
console.log(CategoryDetails);
return res.status(200).json({
    success:true,
    message:"Category created Successfully",
})
    }
    catch(error){
        return res.status(200).json({
            success:false,
            message:error.message
        })
    }
}

//getAlltags handler

exports.showAllCategories=async(req,res)=>{
    try{
const allCategories=await Category.find({},{name:true,description:true});
res.status(200).json({
    success:true,
    message:"All Tags returned successfully",
    data:allCategories,
})
    }
    catch(error){
return res.status(500).json({
    success:false,
    message:error.message,
    })
  }
}

exports.categoryPageDetails = async (req, res) => {
    try {

        //get categoryid
      const { categoryId } = req.body
  
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)

      .populate({
        path: 'courses',
        match: { status: 'Published' },
        populate: [
          { path: 'instructor' },
          { path: 'ratingAndReviews' },
        ],
      })
      .exec();
  
      console.log("SELECTED COURSE", selectedCategory)
      // valdiation to  Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({
            data:selectedCategory,
            success: false,
          message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(200).json({
        data:selectedCategory,
          success: true,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

