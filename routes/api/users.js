
//requiring necessary packages
const express = require("express");
const router=express.Router();
const gravatar=require("gravatar");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const keys=require("../../config/keys");
const passport=require("passport");

//Load input validation
const validateRegisterInput=require("../../validation/register");
const validateLoginInput=require("../../validation/login");

//Load User model
const User=require("../../models/User");

// @access Public
// @route GET api/users/test
// @desc Tests users route
router.get("/test", (req,res)=>{res.json({msg:"Users works"})});


// @access Public
// @route GET api/users/register
// @desc Adds new user
router.post("/register",(req,res)=>{

const{errors,isValid}=validateRegisterInput(req.body);

//Check validation
if(!isValid){
	return res.status(400).json(errors);
}

	User.findOne({email:req.body.email})
	.then(user=>{
		if(user) {
			errors.email="Email already exists"
			return res.status(400).json(errors);
		} else {

			const avatar=gravatar.url(req.body.email,{
				s:"200",//size
				r:"pg",//rating
				d:"mm",//default

			});

			const newUser=new User({
				name:req.body.name,
				email:req.body.email,
				avatar,
				password:req.body.password,
			});

			bcrypt.genSalt(10, (err,salt)=>{
				bcrypt.hash(newUser.password, salt, (err,hash)=> {
					if (err) throw err;
					newUser.password=hash;
					newUser
						.save()
						.then(user=>res.json(user))
						.catch(err=>console.log(err));
				})
			})
		}
	});
	});

// @access Public
// @route GET api/users/login
// @desc login/returning jwt
router.post("/login", (req,res)=>{

	const{errors,isValid}=validateLoginInput(req.body);

	//Check validation
	if(!isValid){
	return res.status(400).json(errors);
	}

	const email=req.body.email;
	const password=req.body.password;

	//find user
	User.findOne({email})
		.then(user=>{
			if (!user) {
				errors.email="User not found";
				return res.status(404).json(errors);
			}
			//check password
			bcrypt.compare(password, user.password)
				.then(isMatch=>{
					if(isMatch){

						const payload={id: user.id, name: user.name, avatar: user.avatar};

						//sign token
						jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err,token)=>{
							if(err) throw err;
							res.json({
								success:true,
								token: "Bearer " + token
							});

						});

					} else {
						errors.password="Password incorrect";
						return res.status(400).json(errors)
					}
				});
		});	
});

// @access Private
// @route GET api/users/current
// @desc return current user
router.get("/current", passport.authenticate("jwt", {session:false}), (req,res)=>{
	res.json({
		id:req.user.id,
		name:req.user.name,
		email:req.user.email
	});

})


//exporting router
module.exports=router;