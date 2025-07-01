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
    socket.to(socket.id).emit("connect");
    onConnection(socket, ioInstance);
  });

  return { server, ioInstance };
};

module.exports = { setupSocketIO };
