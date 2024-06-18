const mongoose=require('mongoose');

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log(`MongoDB is connected to the host:${con.connection.host}`);
    }).catch(error=>{
        console.log(error);
    })   
}
module.exports=connectDatabase;