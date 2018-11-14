//used for signing up and loggin in, authentication routes
const express = require("express");
const router = express.Router();


router.get("/test", (req,res) => {
	res.json({msg: "auth route working"})
})


module.exports = router;
