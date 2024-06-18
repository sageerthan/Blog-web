const mongoose=require('mongoose');
const postSchema=new mongoose.Schema(
    {
      title:{
        type:String,
        required:[true,'Please enter title']
      },
      summary:{
        type:String,
        required:[true,'Please enter summary']
      },
      content:{
        type:String,
        required:[true,'Please enter content']
      },
      file:{
        type:String,
        required:[true,'Please upload image']
      },
      author:{
       type:mongoose.SchemaTypes.ObjectId,
       ref:'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
)
const postModel=mongoose.model('Post',postSchema);
module.exports=postModel;