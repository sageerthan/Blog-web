const catchAsyncError = require("../middlewares/catchAsyncError");
const postModel = require("../models/postModel");
const jwt=require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const fs=require('fs');

exports.publishPost=catchAsyncError(async(req,res,next)=>{   
    try{
     const {originalname,path}=req.file;
     const parts=originalname.split('.');
     const ext=parts[parts.length-1];
     const newPath=path+'.'+ext
     fs.renameSync(path,newPath);
 
     const {token}=req.cookies;
     jwt.verify(token,process.env.JWT_SECRET,{},
         async (err,info)=>{
         if(err) {
          return next(new ErrorHandler(err.message,401))
         }
         const{title,summary,content}=req.body;
         const post=await postModel.create({title,summary,content,file:newPath,author:info.id});
     
         res.json(post);
     })
    }
    catch (error) {
     return next(new ErrorHandler('File processing error', 500));
    }
   });
 

exports.getPosts=catchAsyncError(async(req,res,next)=>{
     const posts= await postModel.find()
                        .populate('author',['username'])
                        .sort({createdAt:-1})
                        .limit(20);
        res.json({
         success:true,
         posts
        })
 });
 

exports.updatePost=catchAsyncError(async(req,res,next)=>{
         let newPath=null;
         if(req.file){
          const{originalname,path}=req.file;
          const parts=originalname.split('.');
          const ext=parts[parts.length-1];
          newPath=path+'.'+ext;
          fs.renameSync(path,newPath);
         }
         const {token}=req.cookies;
         jwt.verify(token,process.env.JWT_SECRET,{},
             async (err,info)=>{
             if(err) {
              return next(new ErrorHandler(err.message,401))
             }
             const{id,title,summary,content}=req.body;
             const postDoc=await postModel.findById(id);
 
             if (!postDoc) {
                 return next(new ErrorHandler('Post not found',404));
             }
             const isAuthor=JSON.stringify(postDoc.author) ===JSON.stringify(info.id);
             
             if(!isAuthor){
                 return next (new ErrorHandler('You are not the author',400));
             }
         
             postDoc.title = title;
             postDoc.summary = summary;
             postDoc.content = content;
             postDoc.file = newPath ? newPath : postDoc.file;
             await postDoc.save();
             res.json(postDoc);
         })
            
 })
 

exports.postDetails=catchAsyncError(async(req,res)=>{
     const {id}=req.params;
     const post=await postModel.findById(id)
                     .populate('author',['username']);
 
     res.json({
         success:true,
         post
     })
 })
 