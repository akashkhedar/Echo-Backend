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

connectToMongoose();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(cookieAuthentication);
app.use(express.urlencoded({ extended: true }));

//AUTHENTICATION ROUTES
app.post("/user/create", limiter, require("./routes/userCreate"));
app.post("/user/verify", require("./routes/verifyUser"));
app.post("/user/login", limiter, require("./routes/userLogin"));
app.post("/user/logout", require("./routes/userLogout"));

//USER ROUTES
app.post("/user/profile", require("./routes/userProfile"));
app.post("/forget-password", require("./routes/forgetPassword"));
app.get(
  "/auth/verify-reset-token/:token",
  require("./routes/verifyResetToken")
);
app.post("/update-password/:token", require("./routes/updatePassword"));
app.post("/update/logged/password", require("./routes/loggedPassword"));
app.post("/update/profile", require("./routes/updateProfile"));
app.post("/deleteaccount", require("./routes/deleteAccount"));
app.get("/fetch/followers/:id", require("./routes/fetchFollowers"));
app.get("/fetch/following/:id", require("./routes/fetchFollowing"));
app.get("/search", require("./routes/searchUser"));
app.get("/check/username", require("./routes/checkUsername"));
app.get("/upload/all", async (req, res) => {
  const result = await uploadBulk();
  res.json(result);
});
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
