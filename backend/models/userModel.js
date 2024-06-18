const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please enter username'],
        unique:true,
        minLength:[5,'Username should have 5 characters']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minLength:[6,'Password should have 6 characters']   
    }
})
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;