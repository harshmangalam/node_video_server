

exports.transformComments = (comment)=>{
	return {
		_id:comment.id,
		commentBody:comment.commentBody,
		createdAt:new Date(comment.createdAt),
		updatedAt:new Date(comment.updatedAt),
		commentOn:{
			_id:comment.commentOn.id,
			name:comment.commentOn.name,
			thumbnail:comment.commentOn.thumbnail,
			videoUrl:comment.commentOn.videoUrl,
		},
		commentBy:{
			_id:comment.commentBy.id,
			name:comment.commentBy.name,
			email:comment.commentBy.email,
		}
	}
}