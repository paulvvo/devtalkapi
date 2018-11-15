//used for signing up and loggin in, authentication routes
const express = require("express");
const router = express.Router();

const User = require("../../models/User");


router.get("/test", (req,res) => {
	res.json({msg: "auth route working"})
})

router.post("/register", (req,res) =>{
	res.json("test");
})

module.exports = router;
