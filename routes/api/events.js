
//requiring necessary packages
const express = require("express");
const router=express.Router();
const gravatar=require("gravatar");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const keys=require("../../config/keys");
const passport=require("passport");

//Load mongoose models
const User=require("../../models/User");
const Event=require("../../models/Event");

// @access Public
// @route GET api/users/test
// @desc Tests users route
router.get("/test", (req,res)=>{res.json({msg:"Users works"})});


//@access Private
//@route Post api/events/organize
//@desc Organize event

router.post('/organize',passport.authenticate("jwt", {session:false}), (req,res)=>{
	

	const newEvent=new Event({
		name:req.body.name,
		description:req.body.description ? req.body.description : '',
		organizer:req.user.id,
		location:req.body.location,
		timing:req.body.timing,
		publicity:req.body.publicity,
		tentative:req.body.tentative,
		price:req.body.price,
		maxParticipants:req.body.maxParticipants,
});
	newEvent
	.save()
	.then(event=>
		res.json(event))
	.catch(err=>console.log(err));
});	

//@access public 
//@route GET api/events/getall
//@desc See all events

router.get("/getall", (req,res)=>{
	Event.find({})
	.then(events=>
		res.json(events)
		)
	.catch(err=>console.log(err));
});

//exporting router
module.exports=router;