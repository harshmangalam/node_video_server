const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
module.exports = async (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) {
		return res.status(403).json({
			error:"Unauthorized Access Denied"
		});
	}
	try {
		const verify = await jwt.verify(token, process.env.JWT_KEY);
		req.user = verify;
			next();
	} catch (error) {
		if(error.name == "JsonWebTokenError"){
			return res.status(403).json({ error:"Unauthorized User"});
		}
		if(error.name == "TypeError"){
			return res.status(403).json({error:"Login To Access this Page"});
		}
		else{
			print(error)
			return res.status(500).json({error:"Some error occur"});
		}
	}
};
