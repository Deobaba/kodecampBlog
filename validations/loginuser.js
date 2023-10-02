const joi = require('joi')

const loginValidation = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
})

const validateLogin = (data)=>{
    return loginValidation.validate(data,{abortEarly:true})
}

module.exports = validateLogin