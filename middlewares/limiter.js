const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60000,
  max: 10,
  message: "Too many requests from this IP, please try again after some time",
});

module.exports = limiter;
