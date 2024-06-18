const express=require('express');
const { publishPost, getPosts, updatePost, postDetails } = require('../controllers/postController');
const router=express.Router();
const multer=require('multer');

const upload=multer({dest:'uploads/'});
router.route('/post').post(upload.single('file'),publishPost)
                     .get(getPosts)
                     .put(upload.single('file'),updatePost);

router.route('/post/:id').get(postDetails);   

module.exports=router;