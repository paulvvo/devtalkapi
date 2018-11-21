const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
	user:{
		type:Schema.Types.ObjectID,
		ref: 'User'
	},
	handle: {
		type:String,
		required:true,
		max:40,
	},
	company:{
		type:String
	},
	website:{
		type:String
	},
	location:{
		type:String,
	},
	status:{
		type:String,
		require:true,
	},
	skills:{
		type:[String],
		required:true
	},
	bio:{
		type:String,
	},
	githubusername:{
		type:String
	}
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
