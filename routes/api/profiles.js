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


module.exports = router;
