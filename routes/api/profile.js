const express= require('express');
const router =express.Router();
const mongoose= require('mongoose');
const passport = require('passport');

//Load validation
const validateProfileinput = require('../../validation/profile')
const validateExperienceinput=require('../../validation/experience')
const validateEducationinput=require('../../validation/education')

//Load Profile model
const Profile = require('../../models/Profile');

//Load User Profile
const user = require('../../models/User')

//@route get to api/profile/test
//@desc Test profile route
//@access Public

router.get('/test',(req,res)=>res.json({msg:'profile works'}));

//@route get to api/profile
//@desc get current user profile
//@access Private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const errors={};

    Profile.findOne({user:req.user.id}).populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noProfile = 'There is no profile for this user'
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
})

//@route get  api/profile/all
//@desc Get all profile
//@access public

router.get('/all',(req,res)=>{

    const errors={}

    Profile.find()
    .populate('user',['name','avatar'])
    .then(profiles=>{
        if(!profiles){
            errors.noProfile = 'There is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    })
    .catch(err=>res.status(404).json({profiles:'there is no profile'}))

})

//@route get  api/profile/handle/:handle
//@desc Get profile bt handle
//@access public

router.get('/handle/:handle',(req,res)=>{
    Profile.findOne({handle: req.params.handle})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noProfile='There is no profile for this user';
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json(err))
})

//@route get  api/profile/user/:user_id
//@desc Get profile by id
//@access public

router.get('/user/:user_id',(req,res)=>{
    Profile.findOne({user: req.params.user_id})
    .populate('users',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noProfile='There is no profile for this user';
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json({profile:'there is no profile'}))
})

//@route post to api/profile
//@desc create or edit user profile
//@access Private

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{

    const {errors,isValid} = validateProfileinput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    //profile field

    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    //Skills split into array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills = req.body.skills.split(',')
    }
    //Social
    profileFields.social={};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id})
    
    .then(profile=>{
        if(profile){
            //update
            Profile.findOneAndUpdate({user:req.user.id},{$set: profileFields},{new:true})
            .then(profile=>res.json(profile))
        } else{
            //create

            //check if handle exists
            Profile.findOne({handle:profileFields.handle}).then(profile=>{
                if(profile){
                    errors.handle = 'That handle already exists'
                    res.status(400).json(errors);
                }

                //Save profile
                new Profile(profileFields).save().then(profile=>res.json(profile));
            });
        }
    })


})

//@route post to api/profile/experience
//@desc Add experience to profile
//@access Private

router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validateExperienceinput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newExp = {
            title:req.body.title,
            company:req.body.company,
            location:req.body.location,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //add to experience array
        profile.experience.unshift(newExp);

        profile.save().then(profile=>res.json(profile));
    })
})

//@route post to api/profile/education
//@desc Add Education to profile
//@access Private

router.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors,isValid} = validateEducationinput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    Profile.findOne({user:req.user.id})
    .then(profile=>{
        const newEdu = {
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description
        }
        //add to experience array
        profile.education.unshift(newEdu);

        profile.save().then(profile=>res.json(profile));
    })
})

//@route delete to api/profile/experience
//@desc delete experience from profile
//@access Private

router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   

    Profile.findOne({user:req.user.id})
    .then(profile=>{
        //Get remove index
        const removeIndex = profile.experience
        .map(item=>item.id)
        .indexOf(req.params.exp_id);

        //splice out of array
        profile.experience.splice(removeIndex,1);

        //save

        profile.save().then(profile=>res.json(profile))
    })
    .catch(err=>res.status(404).json(err))
})

//@route delete to api/profile/education
//@desc delete education from profile
//@access Private

router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
   

    Profile.findOne({user:req.user.id})
    .then(profile=>{
        //Get remove index
        const removeIndex = profile.education
        .map(item=>item.id)
        .indexOf(req.params.edu_id);

        //splice out of array
        profile.education.splice(removeIndex,1);

        //save

        profile.save().then(profile=>res.json(profile))
    })
    .catch(err=>res.status(404).json(err))
})

//@route delete to api/profile
//@desc delete user and profile
//@access Private

router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
   

    Profile.findOneAndRemove({user:req.user.id})
    .then(()=>{
        User.findOneAndRemove({_id:req.user.id})
        .then(()=>res.json({success:true}))
    })
    
})

module.exports = router;