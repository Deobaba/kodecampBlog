const mongoose = require('mongoose');
const {isEmail} = require('validator')
// const blogModel = require('./blog')
const bcrypt = require('bcrypt')
const ExpressError = require('../../utils/expressError')

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

})

// userSchema.pre(
//     'save',
//     async function (next) {
//         const user = this;
//         const hash = await bcrypt.hash(this.password, 10);

//         this.password = hash;
//         next();
//     }
// );





module.exports = mongoose.model('User', userSchema)