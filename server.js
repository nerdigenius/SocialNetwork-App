const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');
const bodyParser = require('body-parser');


require('dotenv').config();
const app = express();
const uri =process.env.ATLAS_URI;

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});
const port = process.env.PORT || 5000;

app.get('/',(req,res)=> res.send('SexyBacck'));
//use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);



mongoose.connection.once('open',()=>{
    console.log('mongoDB connnected successfully');
});

app.listen(port,()=>console.log(`server started on port ${port}`));