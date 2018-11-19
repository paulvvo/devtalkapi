//profiles for each users. stuff like experience, jobs, languages
const express = require("express");
const router = express.Router();


router.get("/test", (req,res) => {
	res.json({msg: "profile route working"})
})


module.exports = router;
