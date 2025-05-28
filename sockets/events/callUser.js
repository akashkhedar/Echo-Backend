const User = require("../../models/user");
const { checkSocketId } = require("../../Utils/redis");

const callUser = async (callerId, calleeId, type, io) => {
  const calleeSocket = await checkSocketId(calleeId);
  const { username } = await User.findById(callerId);
  io.to(calleeSocket).emit("receiveCall", {
    callerName: username,
    callerId,
    calleeId,
    type,
  });
};
module.exports = callUser;
