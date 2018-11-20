const Validator = require("validator");

const isEmpty = require("./isEmpty");

const validateLoginInput = (input) =>{

	const errors = {};

	return {
		errors:errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateLoginInput;
