const User = require("../models/UserModel");
const os = require("os");
const Video = require("../models/VideoModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const {transformUser} = require("./utils/userUtil")

exports.getAllUser = async (req, res) => {

  try {
    const users = await User.find();
    const all_users = users.map(user=>transformUser(user))
    return res.status(200).json({
      users:all_users
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some error occurs" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });
    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }
    const get_user = transformUser(user)
    return res.status(200).json({user:get_user});
  } catch (error) {
    console.log(error.name);
    if (error.name == "CastError") {
      return res.status(400).json({ error: "Invalid User" });
    }
    return res.status(500).json({ error: "some error occur" });
  }
};

exports.userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(422).json({ error: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({error: "Incorrect email"});
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(400).json({error: "Incorrect password"});
    }
    let token;
    if (process.env.adminEmail==email && process.env.adminPass == password) {
      token = await jwt.sign(
        { isAdmin:true,userId: user.id, email: user.email},
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );
       user.isAdmin = true;
       await user.save()
    }
    else{
      token = await jwt.sign(
        { isAdmin:false,userId: user.id, email: user.email },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );
    }
    user.token=token
    await user.save();
    const user_data = transformUser(user)
    return res.status(201).json({
      message: "Login successfully",
      user:user_data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Some error occurs" });
  }
};

exports.userSignUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    var hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    const result = await user.save();
    const get_user = transformUser(result)
    return res.status(201).json({
      message: "User Created",
      user: get_user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Signup failed" });
  }
};

exports.Bio = async (req,res)=>{
  try{
    const user = await User.findById(req.user.userId)
    user.bio = req.body.bio
    await user.save()
    res.status(201).json({message:"Profile Update successfully"})
  }catch(error){
    console.log(error.message)

  }
}

exports.logout = async (req,res) => {
  try{
    const user = await User.findById(req.user.userId)
    user.token = null
    await user.save()
    res.status(200).json({message:"logged out successfully"})

  }catch(error){
    return res.status(500).json({error:"some error occur"})
  }
}
