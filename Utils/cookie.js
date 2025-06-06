const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");

const SECRET = "MyLiTtLeSeCrEt";

const createAccessToken = (payload) => {
  const encodedToken = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  return encodedToken;
};

const verifyAccessToken = (token) => {
  const value = jwt.verify(token, SECRET);
  if (!value) {
    return;
  }
  return value;
};

const createRefreshToken = async () => {
  const token = crypto.randomBytes(64).toString("hex");
  console.log(token);
  return token;
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
};
