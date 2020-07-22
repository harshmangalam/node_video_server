const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    isAdmin: {
      type: Boolean,
      default: false
    },
    bio:{
       type: String,
    },
    token:{
       type: String,
       default:null
    },
  

    createdVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
