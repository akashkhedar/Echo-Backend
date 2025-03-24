const leaveChat = (io, userId) => {
  io.emit("leftChat", { message: `${userId} left the chat!` });
};

module.exports = leaveChat;
