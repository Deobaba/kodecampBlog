const {ErrorResponse} = require('../utils')
const blogModel = require('../models/blog')
const asyncHandler = require('../middleware/async')
const{validateBlog,validateEditBlog} = require('../validations')

exports.createBlog = asyncHandler(async(req,res,next)=>{
    const {error} = validateBlog(req.body)
    if (error){
        // Validation failed, return error response
        return res.status(400).json({ success: false, error: error.details });
      }
    const blog = await blogModel.create(req.body)

    res.status(200).json({
        success:true,
        data:blog
    })

})

exports.editBlog = asyncHandler(async(req,res,next)=>{

    const {error} = validateEditBlog(req.body)
    if (error) {
        // Validation failed, return error response
        return res.status(400).json({ success: false, error: error.details });
      }
    const blog = await blogModel.findByIdAndUpdate(req.params.id,req.body)

    res.status(200).json({
        success:true,
        data:blogg
    })

})

exports.findBlog = asyncHandler(async(req,res,next)=>{
    const blog = await blogModel.findById(req.params.id)
    if(!blog){
        return next (new ErrorResponse('no blog with this Id',404))
    }

    res.status(200).json({
        success:true,
        data:blog
    })
})

exports.getAllBlog = asyncHandler(async(req,res,next)=>{
    const blogs = await blogModel.find({})
    res.status(200).json({
        success:true,
        data:blogs
    })
})

exports.deleteBlog= asyncHandler(async(req,res,next)=>{
    const blog = await blogModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true
    })
})
