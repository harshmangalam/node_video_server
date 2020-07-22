const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VideoSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    thumbnail: {
      type: String,
      required: true
    },
    videoUrl: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
