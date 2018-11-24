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
	}
	if(Validator.isEmpty(input.status)){
		errors.status = "Status Field Required";
	}
	if(Validator.isEmpty(input.skills)){
		errors.skills = "Skills Field  Required";
	}

	return {
		errors:errors,
		isValid:isEmpty(errors)
	}
}

module.exports = validateProfileInput;
