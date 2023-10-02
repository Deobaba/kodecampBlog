const usermodel = require('../models/user');
const asyncHandler = require('../middlewares/async');
const {comparePassword} = require('../utils/authenticationTools');
const {ErrorResponse,sendResponseToken} = require('../utils');  // import the ErrorResponse class and sendresposnetoken function
const { validateCreateUser, validatEditUser ,validateLogin,validateChangePass} = require('../validations');  // import the validation functions

// create a new user
exports.createuser = asyncHandler(async (req, res, next) => {

        req.body.createdAt = new Date();  // add the createdAt property to the request body
        const { error } = validateCreateUser(req.body);  // validate the user data
        if (error) return res.status(400).send(error.details[0].message);  // if there is an error, return the error message

        const user = new usermodel(req.body);  // create a new user

        await user.save();  // save the user to the database

        sendResponseToken(user.id, 200, res);  // send the response token
    
});

exports.editUser = asyncHandler(async (req, res, next) => {
    req.body.updatedAt = new Date();  // add the updatedAt property to the request body

    const { error } = validatEditUser(req.body);  // validate the user data
    
    if (error) return res.status(400).send(error.details[0].message);  // if there is an error, return the error message

    const user = await usermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });  // find the user by id and update the user
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }  // if the user does not exist, return a 404 error

    sendResponseToken(user.id, 200, res);  // send the response token
});

exports.getUser = asyncHandler(async (req, res, next) => { 
    const user = await usermodel.findById(req.params.id);  // find the user by id
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }  // if the user does not exist, return a 404 error
    res.status(200).json({
        success: true,
        data: user
    }) // return the user
} );    

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await usermodel.findByIdAndDelete(req.params.id);  // find the user by id and delete the user
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }  // if the user does not exist, return a 404 error
    res.status(200).json({
        success: true,
        data: {}
    }) // return an empty object
});

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;  // get the email and password from the request body

    if(!email || !password){
        return next(new ErrorResponse(`Please provide an email and password`, 400));
    }  // if there is no email or password, return a 400 error

    const { error } = validateLogin(req.body);  // validate the user data
    if (error) return res.status(400).send(error.details[0].message);  // if there is an error, return the error message

    const user = await usermodel.findOne({ email: email }).select('+password');  // find the user by email and select the password
    if (!user) {
        return next(new ErrorResponse(`User not found with email of ${email}`, 404));
    }  // if the user does not exist, return a 404 error

    const validate = await comparePassword(password,user.password)  // check if the password matches
    if (!validate) {
        return next(new ErrorResponse(`Invalid password`, 401));
    }  // if the password does not match, return a 401 error

    sendResponseToken(user.id, 200, res);  // send the response token
});


exports.changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;   // get the old password and new password from the request body

    if(!oldPassword || !newPassword){
        return next(new ErrorResponse(`Please provide an old password and new password`, 400));
    }  // if there is no old password or new password, return a 400 error

    const { error } = validateChangePass(req.body);  // validate the user data
    
    if (error) return res.status(400).send(error.details[0].message);  // if there is an error, return the error message

    const user = await usermodel.findById(req.params.id).select('+password');  // find the user by id and select the password
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }  // if the user does not exist, return a 404 error

    const validate = await comparePassword(oldPassword,user.password)  // check if the password matches
    if (!validate) {
        return next(new ErrorResponse(`Invalid password`, 401));
    }  // if the password does not match, return a 401 error
    user.password = newPassword;  // set the new password
    await user.save();  // save the user to the database
    sendResponseToken(user.id, 200, res);  // send the response token
});


exports.forgotPassword = asyncHandler(async(req,res,next)=>{
    const {email} = req.body

    if(!email){
        return next(new ErrorResponse('input email', 400))
    }

    const user = await usermodel.findOne({email})

    if(!user){
        return next(new ErrorResponse(`user with ${email} do not exist`,400))
    }

    const resetToken = user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})
    

})

