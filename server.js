const express = require("express");
const mongoose  = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Routes
const authRoutes = require("./routes/api/authRoutes");
const postRoutes = require("./routes/api/postRoutes");
const profileRoutes = require("./routes/api/profileRoutes");

const db = require("./config/keys.js").mongoURI;
mongoose
.connect(db)
.then(() => console.log("Connected"))
.catch(console.log);

const app = express();

//Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(passport.initialize());

//Passport Config
// require("./config/passport")(passport);

//Routes
app.use("/api/auths", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profiles", profileRoutes);
app.listen(process.env.PORT || 5000, () => {
	console.log("Server Listening");
})
