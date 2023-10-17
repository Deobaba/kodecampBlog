const express = require('express');
const {createuser,editUser,deleteUser,changePassword,forgotPassword,getUser,resetpassword,loginUser,getAllUser} = require('../controllers/user');
const usermodel = require('../models/user');

const {protect,authorize} = require('../middleware/auth')

// middlewares and advance filter would be here

const router = express.Router()


router.post('/register',createuser)//
router.put('/edit/:id',protect(usermodel),authorize,editUser)//
router.delete('/delete/:id',protect(usermodel),authorize,deleteUser)//
router.put('/password/:id',protect(usermodel),authorize,changePassword)//
router.post('/forgot',forgotPassword)
router.get('/getuser/:id',protect(usermodel),authorize,getUser)//
router.get('/alluser',getAllUser)//
router.post('/reset',resetpassword)
router.post('/login',loginUser)  //


module.exports = router