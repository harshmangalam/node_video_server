const express = require("express");
const cors = require("cors");
const path = require('path')
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const VideoRoutes = require("./routes/VideoRoutes");
const UserRoutes = require("./routes/UserRoutes");

global.BASE_DIR = path.join(__dirname,'public')
mongoose
	.connect(process.env.MONGO_DEV_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify:false,
	})
	.then(() => console.log("database  connected"))
	.catch(err => console.log(err));

const PORT = process.env.PORT;

app.use('/public',express.static(path.join(__dirname,'public')))
app.use(cors());
app.use(morgan(":method\t :url\t :status\t"));
app.use(express.json());

app.use("/api/videos", VideoRoutes);
app.use("/api/users",UserRoutes);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
