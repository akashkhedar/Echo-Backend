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
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies and other credentials
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
app.post("/forgetpassword", limiter, require("./routes/forgetPassword"));
app.post("/updatepassword", require("./routes/updatePassword"));
app.post(
  "/forgetpassword/update/:code",
  limiter,
  require("./routes/updateForgetPass.js")
);
app.post("/updateprofile", require("./routes/updateProfile"));
app.post("/deleteaccount", require("./routes/deleteAccount"));
app.get("/fetch/followers/:id", require("./routes/fetchFollowers"));
app.get("/fetch/following/:id", require("./routes/fetchFollowing"));
app.get("/search", require("./routes/searchUser"));
app.get("/upload/all", async (req, res) => {
  const result = await uploadBulk();
  res.json(result);
});

//POST ROUTES
app.post("/upload/post", require("./routes/uploadPost"));
app.patch("/update/post/:id", require("./routes/updatePost"));
app.delete("/delete/post/:id", require("./routes/deletePost"));
app.get("/feed/post", require("./routes/feedPost"));

//CHAT ROUTES
app.get("/chat/list", require("./routes/chatList"));
app.post("/send/msg/:id", require("./routes/sendMsg"));
app.get("/fetch/chats/:id", require("./routes/fetchChats"));

server.listen(port, () => console.log("Server Started!"));
