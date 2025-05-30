const mongoose = require("mongoose");
const user = require("./user");

const codeSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
    unique: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 10 * 60,
  },
});

const code = mongoose.model("code", codeSchema);

module.exports = code;
