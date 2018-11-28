const Validator = require("validator");
const isEmpty = require("./isEmpty");


const validateExperienceInput = (input) =>{
	const errors = {};

	input.title = isEmpty(input.title)? "" : input.title;
	input.company = isEmpty(input.company)? "" :input.company;
	input.from = isEmpty(input.from)? "" :input.from;


	if(Validator.isEmpty(input.title)) errors.title = "Title Field cannot be empty";
	if(Validator.isEmpty(input.company)) errors.company = "Company field cannot be empty";
	if(Validator.isEmpty(input.from)) errors.from ="From Date is required";

	return {
		isValid:isEmpty(errors),
		errors:errors,
	}
}

module.exports = validateExperienceInput;
