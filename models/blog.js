
const mongoose = require('mongoose')
const slugify = require('slugify')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, 'title can not be blank'],
        unique:true,
    },
    description:{
        type: String,
        required:[true,'description can not be blank']
    },
    slug: String,
    image:{
        type: String,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
      read_count:{
        type:Number,
        default:0
    },
    tags: String,
    content:{
        type: String,
        required:[true,'body cant be blank']
    },
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date},
}, {timestamps:true})


blogSchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower:true})
    next()
})

const blogModel = mongoose.model('Blog', blogSchema)

module.exports = blogModel;