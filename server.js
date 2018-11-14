const express = require("express");
const app = express();

app.get("/", (req,res) => {
	res.json("Hello Worl!");
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Server Listening");
})
