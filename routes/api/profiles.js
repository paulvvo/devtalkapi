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
module.exports = router;
