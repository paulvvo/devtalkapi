const express = require("express");
const mongoose  = require("mongoose");
const app = express();

const db = require("./config/keys.js").mongoURI;

mongoose
.connect(db)
.then(() => console.log("Connected"))
.catch(console.log);

app.get("/", (req,res) => {
	res.json("Hello Worl!");
})

app.listen(process.env.PORT || 5000, () => {
	console.log("Server Listening");
})
