const User = require("../../models/UserModel")
exports.transformVideo = (video)=>{
  return {
  	_id:video.id,
  	name:video.name,
  	thumbnail:video.thumbnail,
  	videoUrl:video.videoUrl,
  	createdAt:video.createdAt,
  	updatedAt:video.updatedAt,
  	creator:{
  		_id:video.creator.id,
  		name:video.creator.name,
  		email:video.creator.email
  	},
    comments:video.comments.length,
    likes:video.likes.length,
    description:video.description
  }
}


exports.deleteUserReference = async (req)=>{
  const user = await User.findById(req.user.userId)
  const index = await user.createdVideos.indexOf(req.params.video_id)
  await user.createdVideos.splice(index,1)
  await user.save()
}
