const jwt = require('jsonwebtoken')
const {ErrorResponse }= require('../utils')



exports.protect = (model) => async (req, res, next) => {
  
    let token;
    // console.log(model,'model')
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1];
      
      // Set token from cookie
    }
    else if (req.cookies.token) {
      token = req.cookies.token;
    }
    // console.log(token,'here')
    // Make sure token exists
    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
  
    try {
      // Verify token
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log('it got here ',decoded.id)
  
      req.user = await model.findOne({_id:decoded.id});
      // console.log(req.user)
      if(!req.user) {
        return next(new ErrorResponse('Not authorized to access this route!. Please try logging in again', 401)) 
      }
  
      next();
    } catch (err) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
};

exports.authorize = (req,res,next)  => {
    try{
        const {id} = req.params
        if(!req.user || !req.user.id) {
          return next(new ErrorResponse('You are not authorized to access this route',401))
          }

        if(req.user.id !== id){
            return next(new ErrorResponse('You are not authorized to access this route',401))
        }
    
        next()
    }catch(err){
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }



}