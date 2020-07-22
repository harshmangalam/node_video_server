exports.transformUser = (user)=>{
  return {
  	_id:user.id,
  	name:user.name,
  	email:user.email,
    bio:user.bio,
  	createdAt:user.createdAt,
  	isLoggedin :user.isLoggedin,
  	isAdmin:user.isAdmin,
  	createdVideos:user.createdVideos.length,
  	likes:user.likes.length,
  	comments:user.comments.length,
    token:user.token
  }
}
