const usermodel = require('../models/user');
const { validateCreateUser, validatEditUser } = require('../validations');  // import the validation functions

// create a new user
exports.createuser = async (req, res, next) => {
    try {
        req.body.createdAt = new Date();  // add the createdAt property to the request body
        const { error } = validateCreateUser(req.body);  // validate the user data
        if (error) return res.status(400).send(error.details[0].message);  // if there is an error, return the error message

        const user = new usermodel(req.body);  // create a new user
        await user.save();  // save the user to the database
        res.status(201).json(user);  // return the user
    } catch (err) {
        next(err);
    }
};