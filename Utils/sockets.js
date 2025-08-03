const http = require("http");
const { Server } = require("socket.io");
const onConnection = require("../sockets/onConnection");
const { setIO } = require("./io");

const setupSocketIO = (app) => {
  const server = http.createServer(app);
  const ioInstance = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "DELETE"],
    },
  });

  setIO(ioInstance);
  ioInstance.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    socket.broadcast.emit("userOnline", userId);
    onConnection(socket, ioInstance);
    socket.on("disconnect", () => {
      socket.broadcast.emit("userOffline", userId);
    });
  });

  return { server, ioInstance };
};

module.exports = { setupSocketIO };
