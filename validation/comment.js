const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateCommentInput = (input) =>{
	const errors={};

	input.text = isEmpty(input.text)? "":input.text;

	if(!Validator.isLength(input.text, {min:2,max:300})) errors.text ="Length of Text Field Must be Inbetween 2 and 300 Character";
	if(Validator.isEmpty(input.text)) errors.text="Text Field is Required";

	return {
		errors:errors,
		isValid:isEmpty(errors),
	}
}

module.exports = validateCommentInput;
