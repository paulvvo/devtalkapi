//routes for dealing with posts that users can use
const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");

// @route		GET api/posts
// @desc		get all posts
// @access 	public
router.get("/", (req,res) => {
	Post.find({})
	.sort({date:-1})
	.then(foundPosts => res.json(foundPosts))
	.catch(err => res.status(404).json({Posts: "Posts Were Found"}));
})

// @route		GET api/posts/:id
// @desc		get one post by id
// @access 	public
router.get("/:post_id", (req,res)=>{
	Post.findById((req.params.post_id))
	// Post.findOne({_id:req.params.post_id})
	.then(foundPost => res.json(foundPost))
	.catch(err => res.status(404).json({Post:"Post Was Not Found"}))
})


// @route		POST api/posts
// @desc		create a new post
// @access 	private
router.post("/", passport.authenticate("jwt", {session:false}), (req,res) => {
	const {errors, isValid} = validatePostInput(req.body);
	if(!isValid) res.status(400).json(errors);
	else{
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
	}
});

// @route		DELETE api/posts/:post_id
// @desc		delete post by id
// @access 	private
router.delete("/:post_id", passport.authenticate("jwt", {session:false}), (req,res) =>{

Profile.findOne({user:req.user.id})
.then(foundProfile => {
	Post.findById(req.params.post_id)
	.then(foundPost => {
		// console.log(typeof foundPost.user);
		// console.log(typeof req.user.id)
		// console.log(foundPost.user);
		// console.log(req.user.id)

		if(foundPost.user.toString() !== req.user.id)
			return res.status(401).json({Post: "You Are Not Authorized To Delete This"})
		else{
			foundPost.remove()
			.then(() => res.json({Post: "Post Deleted "}))
		}
	})
	.catch(err => res.status(404).json("Post Not Found"))
})
.catch(err => res.status(400).json("Invalid"));
});


// @route		POST api/posts/like/:post_id
// @desc		like a post
// @access 	private

router.post("/like/:post_id", passport.authenticate("jwt", {session:false}), (req,res) => {
	Profile.findOne({user:req.user.id}).then(foundProfile => {
		// console.log(foundProfile);
		Post.findById(req.params.post_id)
		.then(foundPost => {
			const filterArr = foundPost.likes.filter(likeItem => {
				return likeItem.user.toString() === req.user.id.toString()
			})
			// console.log(filterArr);
			// console.log(typeof filterArr);
			// console.log(filterArr.length);
			if(filterArr.length >0) {
				return res.status(400).json({Like: "You have already liked the post"});
			}else {
				foundPost.likes.unshift({user:req.user.id});
				foundPost.save().then(savedPost => res.json(savedPost));
			}
		})
		.catch(err => res.status(404).json({Post:"Post Not Found"}));
	})
})

module.exports=router;
