const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cookieAuthentication = require("./middlewares/cookieAuthentication");
const connectToMongoose = require("./Utils/mongoConnect.js");
const limiter = require("./middlewares/limiter.js");
const { setupSocketIO } = require("./Utils/sockets");
const dotenv = require("dotenv");
const { uploadBulk, getAllUser } = require("./Utils/meilisearchConnect");

dotenv.config();

const app = express();
const port = process.env.PORT;

const { server } = setupSocketIO(app);

app.set("trust proxy", 1);

connectToMongoose();

const allowedOrigins = [
  "http://localhost:3000",
  "https://echo-frontend-w607.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(cookieAuthentication);
app.use(express.urlencoded({ extended: true }));

//ADMIN ROUTE
app.get("/upload/all", async (req, res) => {
  uploadBulk();
  res.status(200).json({ message: "Documents uploaded" });
});

//AUTHENTICATION ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

//USER ROUTES
app.post("/user/profile", require("./routes/userProfile"));
app.post("/update/profile", require("./routes/updateProfile"));
app.post("/deleteaccount", require("./routes/deleteAccount"));
app.get("/fetch/followers/:id", require("./routes/fetchFollowers"));
app.get("/fetch/following/:id", require("./routes/fetchFollowing"));
app.get("/search", require("./routes/searchUser"));
app.get("/check/username", require("./routes/checkUsername"));
app.put("/user/remove/:userIdToRemove", require("./routes/removeFollower"));
app.put("/user/unfollow/:userIdToRemove", require("./routes/unfollowUser"));
app.put("/user/follow/:id", require("./routes/followUser"));

//POST ROUTES
app.post("/upload/post", require("./routes/uploadPost"));
app.delete("/delete/post/:id", require("./routes/deletePost"));
app.get("/feed/post", require("./routes/feedPost"));
app.get("/fetch/posts", require("./routes/fetchPosts"));
app.put("/like/post/:id", require("./routes/likePost"));
app.get("/fetch/comments/:id", require("./routes/fetchComments"));
app.post("/post/comment/:id", require("./routes/postComment"));

//CHAT ROUTES
app.get("/chat/list", require("./routes/chatList"));
app.get("/fetch/chats/:id", require("./routes/fetchChats"));

server.listen(port, () => console.log("Server Started!"));
