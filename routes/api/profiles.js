//profiles for each users. stuff like experience, jobs, languages
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

router.get("/test", (req,res) => {
	res.json({msg: "profile route working"})
})

// @route 	GET api/profiles
// @desc 		gets current user's profile
// @access	private

router.get("/", passport.authenticate("jwt", {session:false}), (req,res)=>{
	const errors = {};

	Profile.findOne({user:req.user.id})
	.populate('user', ['name', 'avatar'])
	.then(foundProfile =>{
		if(!foundProfile){
			errors.profile="No Profile was found for this User";
			res.status(404).json(errors);
		}else
			res.json(foundProfile);
	})
	.catch(err => res.status(404).json(err));
});

// @route 	GET api/profiles/all
// @desc 		get all profiles
// @access	public
router.get("/all", (req,res) => {
	const errors = {};
	Profile.find()
	.populate('user', ['name', 'avatar'])
	.then(profiles => {
		if(!profiles){
			errors.allprofiles="There are no profiles."
			res.status(404).json(errors);
		}else{
			res.json(profiles);
		}
	})
	.catch(err => res.status(404).json(err));
})


// @route 	GET api/profiles/handle/:handle
// @desc 		get user profile by handle
// @access	public

router.get("/handle/:handle", (req,res) =>{
	const errors = {};

	Profile.findOne({handle:req.params.handle})
	.populate('user', ['name','avatar'])
	.then(foundProfile => {
		if(!foundProfile){
			errors.handle = "No Profile Found";
			res.status(404).json(errors);
		}else{
			res.json(foundProfile);
		}
	})
	.catch(err => res.json(err));
})

//@route GET api/profiles/user/:user_id
//@desc get profile by user id
//@access public
router.get("/user/:user_id", (req,res) => {
	const errors = {};

	Profile.findOne({user:req.params.user_id})
	.populate('user', ['name', 'avatar'])
	.then(foundProfile => {
		if(!foundProfile){
			errors.userid="Profile Does Not Exist";
			res.status(404).json(errors);
		}else{
			res.json(foundProfile);
		}
	})
	.catch(err => res.status(404).json(err));
})

// @route 	POST api/profiles
// @desc 		create new user profile and updates
// @access	private

router.post("/", passport.authenticate("jwt", {session:false}), (req,res)=>{
	const {errors,isValid} = validateProfileInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}
	const newProfile = {};
	newProfile.user = req.user.id;
	if(req.body.handle) newProfile.handle = req.body.handle;
	if(req.body.company) newProfile.company = req.body.company;
	if(req.body.website) newProfile.website = req.body.website;
	if(req.body.location) newProfile.location = req.body.location;
	if(req.body.bio) newProfile.bio = req.body.bio;
	if(req.body.status) newProfile.status = req.body.status;
	if(req.body.githubusername) newProfile.githubusername = req.body.githubusername;

	// Skills  - Split into Array
	if(typeof req.body.skills !== "undefined"){
		newProfile.skills = req.body.skills.split(',');
	}

	// Socials
	newProfile.social = {};
	if(req.body.youtube) newProfile.social.youtube = req.body.youtube;
	if(req.body.twitter) newProfile.social.twitter = req.body.twitter;
	if(req.body.facebook) newProfile.social.facebook = req.body.facebook;
	if(req.body.linkedin) newProfile.social.linkedin = req.body.linkedin;
	if(req.body.instagram) newProfile.social.instagram = req.body.instagram;

	Profile.findOne({user:req.user.id})
	.then(profile => {
		if(profile){
			//Update Profile
			Profile.findOneAndUpdate(
				{user:req.user.id},
				{$set:newProfile},
				{new:true}
			)
			.then(updatedProfile => res.json(updatedProfile))
		}else{
			//Check existing handle is present
			Profile.findOne({handle:newProfile.handle})
			.then(foundProfile => {
				if(foundProfile){
					errors.handle = "That Handle Already Exists";
					res.status(400).json(errors);
				}else{
					//Creating New Profile
					new Profile(newProfile).save()
					.then(createdProfile => res.json(createdProfile));
				}
			});
		}
	})
});

// @route 	POST api/profiles/experience
// @desc 		adding work experience onto profiles
// @access	private

router.post("/experience", passport.authenticate("jwt", {session:false}), (req,res) => {

	const {errors, isValid} = validateExperienceInput(req.body);
	if(!isValid) res.status(400).json(errors);

	Profile.findOne({user:req.user.id})
	.then(foundProfile =>{
		const newExperience = {
			title:req.body.title,
			company:req.body.company,
			location:req.body.location,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current,
			description:req.body.description,
		}

		foundProfile.experience.unshift(newExperience);
		foundProfile.save()
		.then(savedProfile => res.json(savedProfile));

	})
	.catch(err => res.status(400).json(err));

});

// @route 	POST api/profiles/education
// @desc 		adding education to profile
// @access	private

router.post("/education", passport.authenticate("jwt", {session:false}), (req,res) =>{
	const {isValid, errors} = validateEducationInput(req.body);
	if(!isValid) return res.status(400).json(errors);

	Profile.findOne({user:req.user.id})
	.then(foundProfile => {
		const newEducation = {
			school:req.body.school,
			degree:req.body.degree,
			fieldofstudy:req.body.fieldofstudy,
			from:req.body.from,
			to:req.body.to,
			current:req.body.current,
			description:req.body.description,
		}

		foundProfile.education.unshift(newEducation);
		foundProfile.save()
		.then(savedProfile => res.json(savedProfile));
	})
	.catch(err => res.status(400).json(err));
})

// @route 	DELETE api/profiles/education/:edu_id
// @desc 		deleting education from profile
// @access	private

router.delete("/education/:edu_id", passport.authenticate('jwt', {session:false}), (req,res) =>{
	Profile.findOne({user:req.user.id})
	.then(foundProfile => {
		const deleteIndex = foundProfile.education.map(item => item.id).indexOf(req.params.edu_id);
		//this doesn't work because array of objects, not just the id
		// const deleteIndex2 = foundProfile.education.indexOf(req.params.edu_id);

		if(deleteIndex !== -1) {
			foundProfile.education.splice(deleteIndex,1);
			foundProfile.save().then(savedProfile => res.json(savedProfile));
		}else{
			res.status(404).json({Education:"Education profile was not found"});
		}

	})
	.catch(err => res.status(400).json("Error Deleting Education"));
})

// @route 	DELETE api/profiles/experience/:exp_id
// @desc 		deleting experience from profile
// @access	private
router.delete("/experience/:exp_id", passport.authenticate('jwt',{session:false}), (req,res) => {
	Profile.findOne({user:req.user.id})
	.then(foundProfile =>{
		const deleteIndex = foundProfile.experience.map(item => item.id).indexOf(req.params.exp_id);
		// console.log(deleteIndex);
		if(deleteIndex !== -1){
			foundProfile.experience.splice(deleteIndex, 1);
			foundProfile.save().then(savedProfile => res.json(savedProfile));
		}else{
			res.status(404).json({Experience:"Experience Profile was not found"});
		}

	})
	.catch(err => res.status(400).json("Error Deleting Experience"));
})


// @route 	DELETE api/profiles/
// @desc 		deleting profile
// @access	private
router.delete("/", passport.authenticate("jwt", {session:false}), (req,res) =>{
	Profile.findOneAndRemove({user:req.user.id})
	.then(() => res.json({Delete: "Success"}))
	.catch(err => res.status(400).json({Profile:"Error with deleting profile"}));
})


module.exports = router;
