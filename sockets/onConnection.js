const joinAllRooms = require("./events/joinAllRooms");
const online = require("./events/online");
const offlineMessages = require("./events/offlineMessages");
const readMsg = require("./events/readMsg");
const sendMessage = require("./events/sendMessage");
const removeOfflineMessages = require("./events/removeOfflineMessages");
const redirectConvo = require("./events/redirectConvo");
const sendOffer = require("./events/sendOffer");
const sendAnswer = require("./events/sendAnswer");
const sendIceCandidate = require("./events/sendIceCandidate");
const callUser = require("./events/callUser");
const callAccepted = require("./events/callAccepted");
const endCall = require("./events/endCall");
const sendNewAnswer = require("./events/sendNewAnswer");
const sendNewOffer = require("./events/sendNewOffer");
const cancelCall = require("./events/cancelCall");
const declinedCall = require("./events/declinedCall");
const offline = require("./events/offline");
const newPost = require("./events/newPost");
const deletePost = require("./events/deletePost");

const onConnection = (socket, io) => {
  socket.on("online", (userId) => {
    online(userId, socket);
  });
  socket.on("joinAllRooms", (rooms) => {
    joinAllRooms(socket, rooms);
  });
  socket.on("sendMessage", ({ senderId, receiverId, message, username }) => {
    sendMessage(socket, senderId, receiverId, message, username, io);
  });
  socket.on("readMsg", ({ msgId, chatId, roomId }) => {
    readMsg(io, msgId);
  });
  socket.on("offlineMessage", (receiver, convoId) => {
    offlineMessages(receiver, convoId);
  });
  socket.on("rmOfflineMsg", (userId, convoId) => {
    removeOfflineMessages(userId, convoId);
  });
  socket.on("redirectConvo", ({ sender, receiver }) => {
    redirectConvo(sender, receiver, socket, io);
  });
  socket.on("callUser", ({ callerId, calleeId, type }) => {
    callUser(callerId, calleeId, type, io);
  });
  socket.on("CancelCall", ({ callerId, calleeId }) => {
    cancelCall(callerId, calleeId, io);
  });
  socket.on("declinedCall", ({ callerId }) => {
    declinedCall(callerId, io);
  });
  socket.on("acceptedCall", ({ callerId, calleeId, type }) => {
    callAccepted(callerId, calleeId, type, io);
  });
  socket.on("sendOffer", ({ callerId, calleeId, offer, type }) => {
    sendOffer(callerId, calleeId, offer, type, io);
  });
  socket.on("sendNewOffer", ({ sender, receiver, newOffer }) => {
    sendNewOffer(sender, receiver, newOffer, io);
  });
  socket.on("sendAnswer", ({ callerId, calleeId, answer }) => {
    sendAnswer(callerId, calleeId, answer, io);
  });
  socket.on("sendNewAnswer", ({ sender, receiver, answer }) => {
    sendNewAnswer(sender, receiver, answer, io);
  });
  socket.on("sendIceCandidate", ({ callerId, calleeId, candidate }) => {
    sendIceCandidate(callerId, calleeId, candidate, io);
  });
  socket.on("endCall", (callee) => {
    endCall(callee, io);
  });
  socket.on("offline", (userId) => {
    offline(userId, socket);
  });
  socket.on("newPost", (post) => {
    newPost(post, socket, io);
  });
  socket.on("postDeleted", ({ postId, userId }) => {
    deletePost(postId, io, userId);
  });
};

module.exports = onConnection;
