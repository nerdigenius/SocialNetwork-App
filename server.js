const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users=require('./routes/api/users');
const profile=require('./routes/api/profile');
const posts=require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');


require('dotenv').config();
const app = express();
const uri =require('./config/keys').ATLAS_URI;

//body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(uri).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));;
const port = process.env.PORT || 5000;

//passport middleware
app.use(passport.initialize());

//passport Config
require('./config/passport')(passport);

//use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);




app.listen(port,()=>console.log(`server started on port ${port}`));