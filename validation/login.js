const Validator = require("validator");

const isEmpty = require("./isEmpty");

const validateLoginInput = (input) =>{

	const errors = {};

	input.email = isEmpty(input.email)?"":input.email;
	input.password = isEmpty(input.password)?"":input.password;
	if(!Validator.isEmail(input.email))
		errors.email = "Email is not valid";
	if(Validator.isEmpty(input.email))
		errors.email = "Email is required";
	if(Validator.isEmpty(input.password))
		errors.password = "Password is required";


	return {
		errors:errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateLoginInput;
