const express= require('express');
const router =express.Router();

//@route get to api/users/test
//@desc Test users route
//@access Public
router.get('/test',(req,res)=>res.json({msg:'users works'}));

module.exports = router;