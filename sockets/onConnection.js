const joinAllRooms = require("./events/joinAllRooms");
const joinChat = require("./events/joinChat");
const leaveChat = require("./events/leaveChat");
const offlineMessages = require("./events/offlineMessages");
const readMsg = require("./events/readMsg");
const sendMessage = require("./events/sendMessage");
const removeOfflineMessages = require("./events/removeOfflineMessages");
const redirectConvo = require("./events/redirectConvo");
const sendOffer = require("./events/sendOffer");
const sendAnswer = require("./events/sendAnswer");

const onConnection = (socket, io) => {
  socket.on("joinChat", (userId) => {
    joinChat(socket, userId);
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
  socket.on("sendIceCandidate", ({ sender, receiver, candidate }) => {
    sendIceCandidate(sender, receiver, candidate, socket, io);
  });
  socket.on("sendOffer", ({ sender, receiver, offer }) => {
    sendOffer(sender, receiver, offer, socket, io);
  });
  socket.on("sendAnswer", ({ sender, receiver, answer }) => {
    sendAnswer(sender, receiver, answer, socket, io);
  });
  socket.on("leaveChat", (userId) => leaveChat(socket, io, userId));
};

module.exports = onConnection;
