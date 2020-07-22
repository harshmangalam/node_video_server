const express = require("express");
const router = express.Router();
const authVerify = require("../middleware/authToken");
const { exploreVideos,getAllVideos, getVideoById,createVideo,deleteVideo ,editVideo} = require("../controllers/VideoControllers");
const {videoValidate,commentValidate } = require("../validations/videoValidate");
const {comment,getVideoComment} = require("../controllers/CommentControllers")
const {likeVideo,unlikeVideo,getLikesOnVideo} = require("../controllers/LikeControllers")
// const trackUser = require("../middleware/trackUser");


router.get("/", getAllVideos);
router.post("/:video_id/comment",commentValidate,authVerify ,comment)
router.get("/:video_id/comment",authVerify,getVideoComment)
router.get("/:video_id", getVideoById);
router.delete("/:video_id",authVerify,deleteVideo);
router.post("/",videoValidate,authVerify,createVideo)
router.put("/:video_id",authVerify,editVideo)
router.post("/:video_id/like",authVerify,likeVideo)
router.post("/:video_id/unlike",authVerify,unlikeVideo)

router.get("/:video_id/like",getLikesOnVideo)



module.exports = router;
