const joi = require('joi')

const forgotpassValidation = joi.object({
    email:joi.string().email().required()
})

const validateForgotpass= (data) =>{
    return forgotpassValidation.validate(data,{abortEarly:true})
}


module.exports = validateForgotpass