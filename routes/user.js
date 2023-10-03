const express = require('express');
const {createuser,editUser,deleteUser,changePassword,forgotPassword,getUser,resetpassword,loginUser,getAllUser} = require('../controllers/user');

// middlewares and advance filter would be here

const router = express.Router()


router.post('/register',createuser)
router.put('/edit',editUser)
router.delete('/delete',deleteUser)
router.put('/password',changePassword)
router.post('/forgot',forgotPassword)
router.get('/getuser/:id',getUser)
router.get('/alluser',getAllUser)
router.post('/reset',resetpassword)
router.post('/login',loginUser)


module.exports = router