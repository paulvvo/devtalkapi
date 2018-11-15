//used for signing up and loggin in, authentication routes
const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();

const User = require("../../models/User");


router.get("/test", (req,res) => {
	res.json({msg: "auth route working"})
})

router.post("/register", (req,res) =>{
	User.findOne({email:req.body.email})
	.then((user) =>{
		if(user){
			res.status(400).json({email:"User Already Exists"});
		}else{
			const avatar = gravatar.url(req.body.email, {
				s: '200',//size
				r: 'pg',//rating
				d: 'mm'//default
			})
			const newUser = new User({
				name:req.body.name,
				email: req.body.email,
				password:req.body.password,
				avatar: avatar 
			})
		}
	})
})

module.exports = router;
