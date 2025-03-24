const Conversation = require("../models/conversation");
const Message = require("../models/message");

const sendMsg = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [userId, id] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, id],
        messages: [],
      });
      const newMessage = new Message({
        sender: userId,
        receiver: id,
        message: message,
      });
      if (newMessage) {
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        await conversation.save();
        res.status(200).send({ message: "Message sent successfully" });
      }
    } else {
      const newMessage = new Message({
        sender: userId,
        receiver: id,
        message: message,
      });
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();
      res.status(200).send({ message: "Message sent successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = sendMsg;
