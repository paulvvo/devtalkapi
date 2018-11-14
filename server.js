const express = require("express");
const mongoose  = require("mongoose");
const app = express();

const db = require("./config/keys.js").mongoURI;

//Routes
const authRoutes = require("./routes/api/authRoutes");
const postRoutes = require("./routes/api/postRoutes");
const profileRoutes = require("./routes/api/profileRoutes");

app.use("/api/auths", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);

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
