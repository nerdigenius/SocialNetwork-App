const express= require('express');
const router =express.Router();
const gravatar = require('gravatar');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

//Load user model
const User = require('../../models/User')

//@route get to api/users/test
//@desc Test users route
//@access Public
router.get('/test',(req,res)=>res.json({msg:'users works'}));

//@route get to api/users/register
//@desc register users route
//@access Public

router.post('/register',(req,res)=>{
    const {errors,isValid}= validateRegisterInput(req.body);
    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email:req.body.email})
    .then(user=>{
        if (user){
            errors.email = 'email already exists'
            return res.status(400).json(errors);
        }
        else{

            const avatar =gravatar.url(req.body.email,{
                s:'200', //size
                r:'pg', //rating
                d:'mm' //default
            })

            const newUser=new User({
                name:req.body.name,
                email:req.body.email,
                avatar:avatar,
                password:req.body.password.trim()
            })

            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                   if(err) throw err;
                   newUser.password = hash;
                   newUser.save()
                   .then(user => res.json(user))
                   .catch(err=>console.log(err)) 
                })
            })
        }
    })

})

//@route get to api/users/login
//@desc login user / return jwt token users route
//@access Public

router.post('/login',(req,res)=>{
    const {errors,isValid}= validateLoginInput(req.body);
     //check validation
     if(!isValid){
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

   

    //Find user
    User.findOne({email})
    .then(user=>{
        if(!user){
            errors.email='user not found'
            return res.status(404).json({errors});
        }

        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(isMatch){
                const payload = {id:user.id,name:user.name,avatar:user.avatar} // create jwt payload
                jwt.sign(payload,keys.sercretOrKeys,{expiresIn: 3600},(err,token)=>{
                    res.json({
                        success: true,
                        token:'Bearer '+ token,
                    });
                })
            }
            else{
                errors.password='password incorrect'
                return res.status(400).json(errors)
            }
        })
    })
})


//@route get to api/users/current
//@desc return current user
//@access Private

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(req.user)
})

module.exports = router;