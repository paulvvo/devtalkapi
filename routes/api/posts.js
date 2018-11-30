//routes for dealing with posts that users can use
const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("../../models/Post");

// @route		POST api/posts
// @desc		create a new post
// @access 	private
router.post("/", passport.authenticate("jwt", {session:false}), (req,res) => {
	const newPost = new Post({
		user:req.user.id,
		name:req.body.name,
		text:req.body.text,
		avatar:req.body.avatar,
	})
	newPost.save()
	.then(createdPost => res.json(createdPost))
	.catch(err => res.status(400).json(err));


	// Post.create({})
})
module.exports=router;
