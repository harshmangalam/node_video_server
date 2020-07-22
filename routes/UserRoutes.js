const express = require("express");
const router = express.Router();
const {Bio,logout,getAllUser,userLogin,userSignUp,getUserById}  = require("../controllers/UserControllers");
const {signupValidation,loginValidation } = require("../validations/userValidate");
const authVerify = require("../middleware/authToken");


router.get("/",getAllUser)
router.get("/logout",authVerify,logout)
router.post("/signup",signupValidation,userSignUp)
router.post("/login",loginValidation,userLogin)

router.get("/:user_id",getUserById)

router.post("/bio",authVerify,Bio)

module.exports = router
