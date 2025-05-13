const endCall = (callee, io) => {
  io.emit("callEnded");
};

module.exports = endCall;
