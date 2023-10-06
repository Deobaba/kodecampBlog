const express = require('express');
const usermodel = require('../models/user');
const {createBlog,editBlog,findBlog,getAllBlog,deleteBlog} = require('../controllers/blog');
const {protect} = require('../middleware/auth')
const router = express.Router()


router.post('/create',protect(usermodel),createBlog)
router.put('/edit/:id',protect(usermodel),editBlog)
router.get('/find/:id',findBlog)
router.get('/allblog',getAllBlog)
router.delete('/delete/:id',protect(usermodel),deleteBlog)





module.exports = router 