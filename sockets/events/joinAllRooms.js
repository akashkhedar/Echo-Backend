const joinAllRooms = (socket, rooms) => {
  rooms.forEach((room) => {
    socket.join(room);
  });
};

module.exports = joinAllRooms;
