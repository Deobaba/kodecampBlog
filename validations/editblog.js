const joi = require('joi');

const editblogValidation = joi.object({
    title: joi.string(),
    description: joi.string(),
    image: joi.string(),
    content:joi.string(),
    tags:joi.string().min(2),
    updatedAt: joi.date().required()
})

const validateEditBlog = (data) =>{
    return editblogValidation.validate(data,{abortEarly:true})
}

module.exports = validateEditBlog