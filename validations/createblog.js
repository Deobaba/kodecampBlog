const joi = require('joi');

const blogValidation = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string(),
    author: joi.string().required(),
    read_count: joi.number(),
    tags:joi.string().min(2).required(),
    content:joi.string().required(),
    createdAt: joi.date().required(),

}) 

const validateBlog = (data) =>{
    return blogValidation.validate(data,{abortEarly:true})
}

module.exports = validateBlog