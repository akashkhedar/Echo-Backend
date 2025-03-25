const joinAllRooms = (socket, rooms) => {
  rooms.forEach((room) => {
    socket.join(room);
    console.log(`Joined room ${room} with ${socket.id}`);
  });
};

module.exports = joinAllRooms;
