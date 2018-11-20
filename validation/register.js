const Validator = require("validator");

const isEmpty  = require("./isEmpty");

const validateRegisterInput = (input) => {
	const errors={};

	//doing this because if user doesn't put in a name field,
	//it doesn't send as a empty string, so we're going to
	//manually set it as a empty string if the field is empty
	input.name = isEmpty(input.name) ? "" : input.name;
	input.email = isEmpty(input.email) ? "" : input.email;
	input.password = isEmpty(input.password) ? "" : input.password;
	input.password2 = isEmpty(input.password2) ? "" :input.password2;


	if(!Validator.isLength(input.name, {min:2, max:30})){
		errors.name = "Name must be between 2 and 30 characters";
	}
	if(Validator.isEmpty(input.name)){
		errors.name = "Name is required";
	}
	if(!Validator.isEmail(input.email)){
		errors.email = "Must Enter Valid Email";
	}
	if(!Validator.isLength(input.password, {min:6, max:30})){
		errors.password = "Password must be 6 to 30 characters";
	}
	if(!Validator.equals(input.password, input.password2)){
		errors.password2 = "Passwords Must Match";
	}

	if(Validator.isEmpty(input.name)){
		errors.name = "Name is required";
	}
	if(Validator.isEmpty(input.email)){
		errors.email = "Email is required";
	}
	if(Validator.isEmpty(input.password)){
		errors.password = "Password is required";
	}
	if(Validator.isEmpty(input.password2)){
		errors.password2 = "Confirmation Password is required";
	}

	return{
		errors:errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateRegisterInput;
