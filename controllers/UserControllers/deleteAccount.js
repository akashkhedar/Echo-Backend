const User = require("../../models/user");
const { deleteRefreshtoken } = require("../../Utils/redis");
const cache = require("../../Utils/cache");
const bcrypt = require("bcrypt");
const Conversation = require("../../models/conversation");
const Message = require("../../models/message");

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;
    const password = req.body.password;
    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(401).end("Error");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const refreshCookie = req.cookies?.refreshToken;
    const accessToken = req.cookies?.accessToken;
    await deleteRefreshtoken(refreshCookie);
    await Conversation.deleteMany({ participants: userId });
    await Message.deleteMany({ sender: userId });
    cache.del(accessToken);
    await user.deleteOne();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteAccount;
