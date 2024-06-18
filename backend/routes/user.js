const express=require('express');
const router=express.Router();
//const multer=require('multer');
//const uploadMiddleware=multer({dest:'uploads/'});
const {registerUser, loginUser, verifyUser, logoutUser,  } = require('../controllers/userController');
//const path=require('path')
//router.use('/uploads',express.static(path.join(__dirname,'..','uploads')))

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(verifyUser);

//router.route('/post').post(uploadMiddleware.single('file'),postContent)
//                     .get(getPost);

module.exports=router;