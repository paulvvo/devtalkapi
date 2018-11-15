//used for signing up and loggin in, authentication routes
const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/User");
const key = require("../../config/keys").secretOrKey;

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
			bcrypt.genSalt(10, (err, salt) =>{
				bcrypt.hash(newUser.password, salt, (err,hash)=>{
					if(err) throw err;

					newUser.password = hash;
					newUser
					.save()
					.then(createdUser => res.json(createdUser))
					.catch(err => console.log(err));
				})
			})


		}
	})
})


router.post("/login", (req,res) =>{
	const {email, password}  = req.body;

	User.findOne({email:email})
	.then(foundUser => {
		if(!foundUser){
			res.status(404).json({msg:'User Not Found'});
		}

		bcrypt.compare(password, foundUser.password)
		.then(isMatch => {
			if(isMatch){
				// res.json({msg: "Success"});
				const payload = {
					id: foundUser.id,
					name: foundUser.name,
					avatar: foundUser.avatar,
				}
				jwt.sign(payload, key, {expiresIn: 3600}, (err,token) => {
					res.json({
						success:true,
						token: 'Bearer '+token,
					})
				})
			}else{
				return res.status(400).json({msg: "Password Incorrect"});
			}
		})
	})
})

module.exports = router;


//when user logins, they get a token and using that token they can access protected routes
//the token is validated using passport and passportjwt and extract user information from the token

//login route actually returns a token
//bearer token is a certain type of protocol
//when you have the token, you take it and put it in the header for authorization
