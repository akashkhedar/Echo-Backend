const sendNewAnswer = (caller, callee, answer, io) => {
  io.emit("getNewAnswer", answer);
};

module.exports = sendNewAnswer;
