const User = require("../models/user");
const Code = require("../models/code");
const mailService = require("../Utils/mail");

const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(401).json({ message: "Email already exist!" });
      return;
    }
    user = await User.create({ email: email });
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const code = await Code.create({
      email: user._id,
      verificationCode: verificationCode,
    });
    mailService(email, verificationCode, req.path);
    res.status(200).json({ message: "Check mail for verification code" });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
