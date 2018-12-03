//routes for dealing with posts that users can use
const express = require("express");
const passport = require("passport");
const router = express.Router();

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
const validateCommentInput =  require("../../validation/comment");

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


// @route		put api/posts/like/:post_id
// @desc		like a post
// @access 	private
router.put("/like/:post_id", passport.authenticate("jwt", {session:false}), (req,res) => {
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

// @route		PUT api/posts/unlike/:post_id
// @desc		unlike a post
// @access 	private
router.put("/unlike/:post_id", passport.authenticate("jwt", {session:false}), (req,res) => {
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
			if(filterArr.length ===0) {
				return res.status(400).json({Unlike: "You Have Not Liked This Post Yet"});
			}else {


				const mapArr = foundPost.likes.map(likeItem => likeItem.user.toString());
				// console.log(mapArr);
				const deleteIndex = mapArr.indexOf(req.user.id.toString());
				// console.log(req.user.id);
				// console.log(deleteIndex);
				if(deleteIndex !== -1){
					foundPost.likes.splice(deleteIndex, 1);
					foundPost.save().then(savedPost => res.json(savedPost));
				}else{
					console.log("error");
				}

			}
		})
		.catch(err => res.status(404).json({Unlike:"Unlike Post Error"}));
	})
})

// @route		POST api/posts/comment/:post_id
// @desc		creating a new comment
// @access 	private
router.post("/comment/:post_id", passport.authenticate("jwt", {session:false}), (req,res) =>{
	Post.findById(req.params.post_id)
	.then(foundPost => {
		const {errors, isValid} = validateCommentInput(req.body);
		if(!isValid) return res.status(400).json(errors);

		const newComment = {
			user:req.user.id,
			text:req.body.text,
			avatar: req.body.avatar,
			name: req.body.name,
		}
		foundPost.comments.unshift(newComment);
		foundPost.save().then(savedPost => res.json(savedPost));
	})
	.catch(err => res.status(404).json({Post:"Post Not Found"}));
})

// @route		DELETE api/posts/comment/:post_id/:comment_id
// @desc		delete comment from post
// @access 	private
router.delete("/comment/:post_id/:comment_id", passport.authenticate("jwt", {session:false}), (req,res) =>{
	Post.findById(req.params.post_id)
	.then(foundPost => {
		//check if the comment exists
		const filterArr = foundPost.comments.filter(comment => comment._id.toString() === req.params.comment_id.toString())
		// console.log(filterArr);
		if(filterArr.length === 0) return res.status(404).json({Comment:"Comment Does Not Exist"});
		//should i check if the person deleting owns the comment????

		//get delete index
		else{
			const mapArr = foundPost.comments.map(comment => comment._id.toString());
			const deleteIndex = mapArr.indexOf(req.params.comment_id.toString());
			// console.log(mapArr);
			// console.log(deleteIndex);
			if(deleteIndex > 0){
				//delete comment
				foundPost.comments.splice(deleteIndex,1);
				//save post
				foundPost.save().then(savedPost => res.json(savedPost));
			}
		}
	})
	.catch(err => res.status(400).json({Comment:"Delete Comment Error"}))
})



module.exports=router;
