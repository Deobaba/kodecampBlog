const mongoose = require('mongoose');
const {isEmail} = require('validator')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, "username is required"],
        unique:true
    }
    ,
    email:{
        type: String,
        unique:true,
        required:[true, "email is required"],
        lowercase: true,
        validate:[isEmail,"enter valid email"]

    },
    password:{
        type: String,
        required: true,
        minlength:[6, "atleast 6 characters"]
    },
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    createdAt : {type: Date, default: Date.now},
    updateAt:{type: Date},
    resetPasswordToken: String,
    resetPasswordExpire: Date,

})



userSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex')
  
    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
};




module.exports = mongoose.model('User', userSchema)