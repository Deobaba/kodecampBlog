const joi = require('joi')

const edituserValidation = joi.object ({
    username:joi.string().min(3),
    email:joi.string().email(),
    updatedAt:joi.date().required()
})

const validatEditUser = (data)=>{
    return edituserValidation.validate(data,{abortEarly:true})
}

module.exports = validatEditUser