const joi = require('joi')

const changePasswordvalidation = joi.object({
    oldPassword:joi.string().min(6).required(),
    newPassword:joi.string().min(6).required()
})

const validateChangePass = (data)=>{
    return changePasswordvalidation.validate(data,{abortEarly:true})
}

module.exports = validateChangePass