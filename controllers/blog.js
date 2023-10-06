const {ErrorResponse} = require('../utils')
const blogModel = require('../models/blog')
const usermodel = require('../models/user')
const asyncHandler = require('../middleware/async')
const{validateBlog,validateEditBlog} = require('../validations')



exports.createBlog = asyncHandler(async(req,res,next)=>{
    req.body.author = req.user.id
    req.body.createdAt = new Date(); 

    const {error} = validateBlog(req.body)
    if (error){
        // Validation failed, return error response
        return res.status(400).json({ success: false, error: error.details });
      }

     

    const blog = await blogModel.create(req.body)

    const user = await usermodel.findById(req.user.id)
    user.blog.push (blog)
    user.save()

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
    let blog = await blogModel.findById(req.params.id)

    if(!blog){
        return next (new ErrorResponse('no blog with this Id',404))
    }
    if(blog.author != req.user.id){
        return next (new ErrorResponse('You are not authorized to edit this blog',401))
    }
     blog = await blogModel.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

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

    blog.read_count = blog.read_count + 1

    res.status(200).json({
        success:true,
        data:blog
    })
})

exports.getAllBlog = asyncHandler(async(req,res,next)=>{
   const blogs = await blogModel.find({}).populate({path:"author",select:'username email'})
   if(!blogs){
       return next (new ErrorResponse('no blogs found',404))
    }
    res.status(200).json({
        success:true,
        data:blogs
    })
})

exports.deleteBlog= asyncHandler(async(req,res,next)=>{
    const blog = await blogModel.findById(req.params.id)
    if(!blog){
        return next (new ErrorResponse('no blog with this Id',404))
    }
    if(blog.author != req.user.id){
        return next (new ErrorResponse('You are not authorized to delete this blog',401))
    }

    blog.remove()
    res.status(200).json({
        success:true
    })
})
