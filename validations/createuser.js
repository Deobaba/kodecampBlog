const joi = require('joi');

const createuser = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    createdAt: joi.date().required(),
})

const validateCreateUser = (data) =>{
    return createuser.validate(data,{abortEarly:true})
}

module.exports = validateCreateUser