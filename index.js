const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cookieAuthentication = require("./middlewares/cookieAuthentication");
const connectToMongoose = require("./Utils/mongoConnect.js");
const limiter = require("./middlewares/limiter.js");
const { setupSocketIO } = require("./Utils/sockets");
const dotenv = require("dotenv");
const { uploadBulk } = require("./Utils/meilisearchConnect");

dotenv.config();

const app = express();
const port = process.env.PORT;

const { server } = setupSocketIO(app);

app.set("trust proxy", 1);

connectToMongoose();

const allowedOrigins = ["http://localhost:3000", "https://app.echo.linkpc.net"];

app.use(
  cors({
    origin: function (origin, callback) {
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
app.use("/api/admin", require("./routes/adminRoute"));

//AUTHENTICATION ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

//USER ROUTES
app.use("/api/user", require("./routes/userRoutes"));

//POST ROUTES
app.use("/api/post", require("./routes/postRoutes"));

//CHAT ROUTES
app.use("/api/chat", require("./routes/chatRoutes"));

server.listen(port, () => console.log("Server Started!"));
