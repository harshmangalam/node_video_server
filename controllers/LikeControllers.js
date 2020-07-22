const User = require("../models/UserModel");
const Video = require("../models/VideoModel");
const Like = require("../models/LikeModel");
const {deleteLikeReference,transformLikes} = require('./utils/likeUtils');
exports.likeVideo = async (req, res) => {
  try {
		const like = await Like.findOne({likeBy:req.user.userId,likeOn:req.params.video_id})
    if (like) {
			return res.status(400).json({error:"you already like this video"})
		}
      const newLike = await new Like({
        likeOn: req.params.video_id,
        likeBy: req.user.userId
      });
      await newLike.save();
      const user = await User.findById(req.user.userId);
      await user.likes.push(newLike);
      await user.save();
      const video = await Video.findById(req.params.video_id);
      await video.likes.push(newLike);
      await video.save();

      res.status(201).json({
        message: `you like this video`
      });
  } catch (error) {
    console.log(error);
    if (error.name == "CastError") {
      return res.status(404).json({ error: "invalid video" });
    }
    return res.status(500).json({ error: "some error occurs" });
  }
};

exports.unlikeVideo = async (req, res) => {
  try {
    const like = await Like.findOne({
      likeOn: req.params.video_id,
      likeBy: req.user.userId
    });
    if (like) {
			await deleteLikeReference(req,like._id);
      await Like.deleteOne({
        likeOn: req.params.video_id,
        likeBy: req.user.userId
      });
        res.status(201).json({
          message: "you are no longer like this video"
        });
      } else {
        res.status(400).json({
          error: "you yet not like it ",
        });
      }
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(404).json({ message: "invalid video", type: "error" });
    }
    console.log(error);
  }
};


exports.getLikesOnVideo = async (req,res) => {
  try{
    const likes = await Like.find({likeOn:req.params.video_id}).populate("likeBy")
    .populate("likeOn")
    const get_likes = likes.map(like=>transformLikes(like))
    res.status(200).json({likes:get_likes})
  }catch(error){
    console.log(error)
  }
}

