const mongoose = require("mongoose");
const User = require("./user");

const codeSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
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

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;