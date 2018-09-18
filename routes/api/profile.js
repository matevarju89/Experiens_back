
//requiring necessary packages
const express = require("express");
const router=express.Router();
const gravatar=require("gravatar");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const keys=require("../../config/keys");
const passport=require("passport");

// @access Public
// @route GET api/users/test
// @desc Tests users route
router.get("/test", (req,res)=>{res.json({msg:"Users works"})});


//exporting router
module.exports=router;