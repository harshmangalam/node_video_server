const { check, body } = require("express-validator");
const User = require("../models/UserModel")

exports.videoValidate = [

check('name').not().isEmpty(),
check('description').not().isEmpty(),
check('thumbnail').not().isEmpty(),
check('videoUrl').not().isEmpty(),
]


exports.commentValidate = [
check('body').not().isEmpty()
]

// "name":"video 1",
// "description":"my description 1"
// "thumbnail":"http://localhost:3000/public/images/logo.svg",
// "videoUrl":"http://localhost:3000/public/videos/video1.webm"
