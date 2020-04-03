const express= require('express');
const router =express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

//Post model
 const Post = require('../../models/Post')
 //Profile Model
 const Profile = require('../../models/Profile')

 //Post Validator
 const validatePostInput = require('../../validation/post')

//@route get to api/posts/test
//@desc Test post route
//@access Public

router.get('/test',(req,res)=>res.json({msg:'posts works'}));

//@route get to api/posts
//@desc GET post
//@access Public

router.get('/',(req,res)=>{
    Post.find()
    .sort({date:-1})
    .then(posts =>res.json(posts))
    .catch(err=>res.status(404).json({nopostfound:'No posts found'}))
})

//@route get to api/posts/:id
//@desc GET post
//@access Public

router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
    .then(posts =>res.json(posts))
    .catch(err=>res.status(404).json({nopostfound:'No posts found'}))
})

//@route post to api/posts
//@desc Create post
//@access private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{errors,isValid} = validatePostInput(req.body)
    //check validation
    if(!isValid){
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text:req.body.text,
        name:req.body.name,
        avatar:req.body.avatar,
        user:req.user.id
    })

    newPost.save().then(post=>res.json(post))
})

//@route DELETE api/posts/:id
//@desc Delete post
//@access private

router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
        .then(post=>{
            //Check for post owner
            if(post.user.toString() !=req.user.id){
                return res.status(401).json({notauthorize:'User not authorised'})
            }

            //Delete
            post.remove().then(()=>res.json({success:true}))
        })
        .catch(err=>res.status(404).json({nopostfound:'No posts found'}))
    })
})
module.exports = router;