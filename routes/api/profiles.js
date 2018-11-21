//profiles for each users. stuff like experience, jobs, languages
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const Profile = require("../../models/Profile");
const User = require("../../models/Profile");


router.get("/test", (req,res) => {
	res.json({msg: "profile route working"})
})

// @route 	GET api/profile
// @desc 		gets current user's profile
// @access	private

router.get("/", passport.authenticate("jwt", {session:false}), (req,res)=>{
	const errors = {};

	Profile.findOne({user:req.user.id})
	.then(foundProfile =>{
		if(!foundProfile){
			errors.profile="No Profile was found for this User";
			res.status(404).json(errors);
		}else res.json(foundProfile);

	})
	.catch(err => res.status(404).json(err));
})

// @route 	POST api/profile
// @desc 		create new user profile
// @access	private

router.post("/", passport.authenticate("jwt", {session:false}), (req,res)=>{
	const newProfile = {};
	newProfile.user = req.user.id;
	if(req.body.handle) newProfile.handle = req.body.handle;
	if(req.body.company) newProfile.company = req.body.company;
	if(req.body.website) newProfile.website = req.body.website;
	if(req.body.location) newProfile.location = req.body.location;
	if(req.body.bio) newProfile.bio = req.body.bio;
	if(req.body.status) newProfile.status = req.body.status;
	if(req.body.githubusername) newProfile.githubusername = req.body.githubusername;
})
module.exports = router;
