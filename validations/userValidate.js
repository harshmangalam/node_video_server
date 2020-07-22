const { check, body } = require("express-validator");
const User = require("../models/UserModel")


exports.signupValidation = [
	check("name")
		.not()
		.isEmpty(),
	check("email")
		.isEmail()
		.withMessage("Email must be valid and not empty"),
	check("password")
		.not()
		.isEmpty(),
];



exports.loginValidation = [
	check("email")
		.isEmail()
		.withMessage("Email must be valid and not empty"),
	check("password")
		.not()
		.isEmpty(),
];

// "name":"video 1",
// "description":"d1",
// "thumbnail":"http://localhost:3000/public/images/logo.svg",
// "videoUrl":"http://localhost:3000/public/videos/video1.webm"
