const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
	commentBody:{
		type:String,
		required:true
	},

	commentBy:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},

	commentOn:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Video"
	},

},{timestamps:true})

module.exports = mongoose.model('Comment',CommentSchema)
