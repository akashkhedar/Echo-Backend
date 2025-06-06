const User = require("../models/user");
const mailService = require("../Utils/mail");
const { storeVerificationCode } = require("../Utils/redis");

const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      if (user.isVerified) {
        if (user.profileStatus) {
          return res.status(409).json({ message: "Email already in-use!" });
        }
        return res.status(401).json({ message: "Profile incomplete!" });
      }
      await user.deleteOne();
    }
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await storeVerificationCode(email, verificationCode);
    mailService(email, verificationCode, req.path);
    res.status(200).json({ message: "Check mail for verification code" });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
