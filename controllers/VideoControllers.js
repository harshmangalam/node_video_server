const Video = require("../models/VideoModel");
const User = require("../models/UserModel");
const { validationResult } = require("express-validator");
const { transformVideo, deleteUserReference } = require("./utils/videoUtils");

exports.getAllVideos = async (req, res) => {
  const videos = await Video.find().sort({createdAt:-1})
  .populate("creator");
  const all_videos = videos.map(video => transformVideo(video));
  res.status(200).json({
    videos:all_videos
  });
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.video_id).populate("creator");
    if (!video) {
      return res.status(404).json({ error: "video not found" });
    }
    const get_video = transformVideo(video);
    return res.status(200).json({ video: get_video });
  } catch (error) {
    console.log(error);
    if (error.name == "CastError") {
      return res.status(404).json({ error: "video not found" });
    }
    return res.status(500).json({ error: "some error occur" });
  }
};

exports.createVideo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array() });
  }
  const { name, description, thumbnail, videoUrl } = req.body;
  const video = new Video({
    name,
    description,
    thumbnail,
    videoUrl,
    creator: req.user.userId
  });
  try {
    const result = await video.save();
    const createdVideo = transformVideo(result);
    let creator = await User.findById(req.user.userId);
    await creator.createdVideos.push(video);
    await creator.save();
    console.log(createdVideo)
    res.status(201).json({
      message: `video created sussessfully`,
      video: createdVideo
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some error occur" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.video_id);
    if (video.creator == req.user.userId) {
      await deleteUserReference(req);
      await Video.deleteOne({ _id: req.params.video_id });
      return res.status(201).json({ message: "video deleted" });
    } else {
      return res
        .status(403)
        .json({ error: "not authorize to delete this video" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some error occurs" });
  }
};

exports.editVideo = async (req, res) => {
  const { name, description, thumbnail, videoUrl } = req.body;
  try {
    const video = await Video.findOne({ _id: req.params.video_id });
    if (!video) {
      return res.status(404).json({ error: "video not found" });
    }
    if (video.creator == req.user.userId) {
      const newVideo = { name, description, thumbnail, videoUrl };
      await Video.updateOne({ _id: req.params.video_id }, newVideo);
      return res.status(201).json({ message: "video updated" });
    } else {
      return res
        .status(403)
        .json({ error: "not authorize to edit this video" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "some error occurs" });
  }
};

