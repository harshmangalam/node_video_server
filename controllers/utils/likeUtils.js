const User = require("../../models/UserModel")
const Video = require("../../models/VideoModel")

exports.transformLikes = (like)=>{
return {
	_id:like.id,
	likeBy:{
		_id:like.likeBy.id,
		name:like.likeBy.name,
		email:like.likeBy.email,
	},
	likeOn:{
		_id:like.likeOn.id,
		name:like.likeOn.name,
		thumbnail:like.likeOn.thumbnail
	}
}
}


exports.deleteLikeReference = async (req,like_id)=>{
  const user = await User.findById(req.user.userId)
  const user_index = await user.likes.indexOf(like_id)
  await user.likes.splice(user_index,1)
  await user.save()

  const video = await Video.findById(req.params.video_id)
  const video_index = await video.likes.indexOf(like_id)
  await video.likes.splice(video_index,1)
  await video.save()
}
