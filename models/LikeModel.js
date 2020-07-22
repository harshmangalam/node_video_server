const mongoose = require("mongoose");
const LikeSchema = mongoose.Schema({

	likeOn:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Video"
	},

	likeBy:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
},{timestamps:true});

module.exports = mongoose.model('Like',LikeSchema);
