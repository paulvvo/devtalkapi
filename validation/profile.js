const Validator = require("validator");
const isEmpty = require("./isEmpty");


const validateProfileInput = (input) => {
	const errors = {};

	input.handle = isEmpty(input.handle)? "" : input.handle;
	input.status = isEmpty(input.status)? "" : input.status;
	input.skills = isEmpty(input.skills)? "" : input.skills;

	if(!Validator.isLength(input.handle, {min:2, max:40})){
		errors.handle = "Handle length must be between 2 and 40";
	}
	if(Validator.isEmpty(input.handle)){
		errors.handle = "Handle Field Required";
		console.log("hello");
	}
	if(Validator.isEmpty(input.status)){
		errors.status = "Status Field Required";
	}
	if(Validator.isEmpty(input.skills)){
		errors.skills = "Skills Field  Required";
	}

	if(!isEmpty(input.website)){
		if(!Validator.isURL(input.website)){
			errors.website = "Not a Valid URL";
		}
	}
	if(!isEmpty(input.youtube)){
		if(!Validator.isURL(input.youtube)){
			errors.youtube = "Not a Valid URL";
		}
	}
	if(!isEmpty(input.twitter)){
		if(!Validator.isURL(input.twitter)){
			errors.twitter = "Not a Valid URL";
		}
	}
	if(!isEmpty(input.facebook)){
		if(!Validator.isURL(input.facebook)){
			errors.facebook = "Not a Valid URL";
		}
	}
	if(!isEmpty(input.linkedin)){
		if(!Validator.isURL(input.linkedin)){
			errors.linkedin = "Not a Valid URL";
		}
	}
	if(!isEmpty(input.instagram)){
		if(!Validator.isURL(input.instagram)){
			errors.instagram = "Not a Valid URL";
		}
	}

	return {
		errors:errors,
		isValid:isEmpty(errors)
	}
}

module.exports = validateProfileInput;
