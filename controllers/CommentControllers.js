const User = require("../models/UserModel");
const Video = require("../models/VideoModel");
const Comment = require("../models/CommentModel");
const {transformComments} = require("./utils/commentUtils")


exports.comment = async (req, res) => {
	const { body } = req.body;
	try {
		const video = await Video.findById(req.params.video_id)
		if (!video) {
			return res.status(404).json({ error: "invalid video"});
		}
		let comment = new Comment({
			commentBody: body,
			commentBy: req.user.userId,
			commentOn: req.params.video_id,
		});
		const saveComment = await comment.save();
		let user = await User.findById(req.user.userId);
		await user.comments.push(comment);
		await user.save();
		await video.comments.push(comment);
		await video.save();
		res.status(201).json({message: `comment published successfully`});
	} catch (error) {
		console.log(error);
		if (error.name == "CastError") {
			return res.status(404).json({ error: "invalid video"});
		}
		return res.status(500).json({error:"some error occurs"})
		
	}
};

exports.getVideoComment = async (req, res) => {
	try{
	const video = await Video.findById(req.params.video_id)
	if (!video) {
		return res.status(404).json({ error: "video not found"});
	}
	const comments = await Comment.find({ commentOn: req.params.video_id })
	.populate("commentOn")
	.populate("commentBy")
	all_comments = comments.map(comment=>transformComments(comment))
	res.status(200).json({ comments:all_comments });

}
	catch(error){
		console.log(error)
		return res.status(500).json({error:"some error occurs"})
	}
};
