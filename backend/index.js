const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const path=require('path');
const auth=require('./routes/user');
const postData=require('./routes/post');
const connectDatabase=require('./config/database');
const errorMiddleware=require('./middlewares/error')
const cookieParser=require('cookie-parser');

dotenv.config({path:path.join(__dirname,'config','config.env')});

connectDatabase();
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/',auth);
app.use('/api/v1/',postData);

app.use('/uploads', express.static(path.join(__dirname,'uploads')));


app.use(errorMiddleware);

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to the port ${process.env.PORT} `);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error:${err.message}`);
    console.log('Server is shuttingdown due to unhandled rejection error');
    server.close(()=>{
         process.exit(1);
    })
})