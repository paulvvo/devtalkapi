const Validator = require("validator");
const isEmpty = require("./isEmpty");


const validateEducationInput = (input) => {
	const errors = {};

	input.school = isEmpty(input.school) ? "" : input.school;
	input.degree = isEmpty(input.degree) ? "" : input.degree;
	input.fieldofstudy = isEmpty(input.fieldofstudy) ? "" : input.fieldofstudy;
	input.from = isEmpty(input.from) ? "" : input.from;


	if(Validator.isEmpty(input.school)) errors.school = "School Field is Required";
	if(Validator.isEmpty(input.degree)) errors.degree = "Degree Field is Required";
	if(Validator.isEmpty(input.fieldofstudy)) errors.fieldofstudy = "Field of Study is Required";
	if(Validator.isEmpty(input.from)) errors.from = "From Date is Required";

	return {
		isValid:isEmpty(errors),
		errors: errors,
	}
}

module.exports = validateEducationInput;
