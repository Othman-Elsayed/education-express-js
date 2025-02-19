let users = [];

const socketHandler = (socket, io) => {
  console.log("User connected:", socket.id);

  const userOnline = (user) => {
    users = [
      ...users.filter((e) => e?._id !== user?._id),
      { ...user, socketId: socket.id },
    ];
    io.emit("usersOnline", users);
  };

  const userOffline = () => {
    users = users.filter((el) => el.socketId !== socket.id);
    io.emit("usersOnline", users);
  };

  const sendMsg = (msg) => {
    const receiver = users.find((el) => el?._id === msg?.received);

    if (receiver) {
      io.to(receiver.socketId).emit("msg", { ...msg, isRead: false });
    }
  };

  const seenMsg = (msg) => {
    const senderUser = users.find((el) => el?._id === msg?.sender);

    if (senderUser) {
      io.to(senderUser.socketId).emit("msgReed", { ...msg, isRead: true });
    }
  };

  socket.on("userOnline", userOnline);
  socket.on("sendMsg", sendMsg);
  socket.on("seenMsg", seenMsg);
  socket.on("disconnect", userOffline);
};

module.exports = socketHandler;
