const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');


exports.registerUser=catchAsyncError(async(req,res,next)=>{
        
        const{username,password}=req.body;
        const user=await userModel.create({username,password:await bcrypt.hash(password,10)})
        res.status(200).json({
           success:true,
           user
        })    
});
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const{username,password}=req.body;

    if(!username || !password){
        return next(new ErrorHandler('Please enter  username & password',400));
    }
    const user=await userModel.findOne({username});

    if(!user){
        return next(new ErrorHandler('Invalid username or password',401))
    }
    const valid_pw=await bcrypt.compare(password,user.password);
    
    if(!valid_pw){
        return next(new ErrorHandler('Invalid username or password',401))
    }

    jwt.sign({username,id:user._id},process.env.JWT_SECRET,{},
            (err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:user._id,
                username
            });
        })
    
})

exports.verifyUser=(req,res,next)=>{
    const {token}=req.cookies;
    jwt.verify(token,process.env.JWT_SECRET,{},
        (err,info)=>{
        if(err) {
            return next(new ErrorHandler(err.message))
        };
        res.json(info);
    })
}
exports.logoutUser=(req,res,next)=>{
    res.cookie('token',null).json('Logout');
}

