const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profileStatus: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    interests: {
      type: String,
    },
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    profileImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522default%2Bprofile%2Bpicture%2522&psig=AOvVaw0ufxeyI-d3zsr7W8pZLGyy&ust=1733304945867000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjHyLSmi4oDFQAAAAAdAAAAABAE",
    },
    coverImage: {
      type: String,
      default: "https://wallhalla.com/thumbs/8",
    },
  },
  { timestamps: true }
);

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update && update.password) {
    update.password = await bcrypt.hash(update.password, 10);
    this.setUpdate(update);
  }
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
