const Validator = require("validator");
const isEmpty = require("./isEmpty");


const validateProfileInput = (input) => {
	const errors = {};

	return {
		errors:errors,
		isValid:isEmpty(errors)
	}
}

module.exports = validateProfileInput;
