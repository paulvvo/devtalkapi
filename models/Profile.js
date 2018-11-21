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
	},
	experience:[
		{
			title:{
				type:String,
				require:true
			},
			company:{
				type:String,
				required:true,
			},
			location:{
				type:String
			},
			from:{
				type:Date,
				required:true
			},
			to:{
				type:Date
			},
			current:{
				type:Boolean,
				default:false,
			},
			description:{
				type:String
			}
		}
	],
	education:[
		{
			school:{
				type:String,
				require:true
			},
			degree:{
				type:String,
				required:true,
			},
			fieldofstudy:{
				type:String
			},
			from:{
				type:Date,
				required:true
			},
			to:{
				type:Date
			},
			current:{
				type:Boolean,
				default:false,
			},
			description:{
				type:String
			}

		}
	],
	social:{
		youtube:{
			type:String,
		},

		twitter:{
			type:String,
		},

		facebook:{
			type:String,
		},

		linkedin:{
			type:String,
		},

		instagram:{
			type:String,
		},
	},
	date:{
		type:Date,
		default:Data.now
	}
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
