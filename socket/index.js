let users = [];

const socketHandler = (socket, io) => {
  console.log("User connected:", socket.id);

  const userOnline = (userId) => {
    users = [
      ...users.filter((e) => e?._id !== userId),
      { userId, socketId: socket.id },
    ];
    io.emit("usersOnline", users);
  };

  const userOffline = () => {
    users = users.filter((el) => el.socketId !== socket.id);
    io.emit("usersOnline", users);
  };

  const sendMsg = (msg) => {
    const receiver = users.find((el) => el?.userId === msg?.received);
    if (receiver) {
      io.to(receiver.socketId).emit("getMsgs", msg);
      io.to(receiver.socketId).emit("getNoti", { ...msg, isRead: false });
    }
  };

  const updateMsg = (msg) => {
    const receiver = users.find((el) => el?.userId === msg?.received);
    if (receiver) {
      io.to(receiver.socketId).emit("getMsgs", { ...msg, edited: true });
    }
  };

  const removeMsg = (msg) => {
    const receiver = users.find((el) => el?.userId === msg?.received);
    if (receiver) {
      io.to(receiver.socketId).emit("getMsgs", { ...msg, removed: true });
    }
  };

  const seenMsg = (msg) => {
    const sender = users.find((el) => el?.userId === msg?.sender);
    if (sender) {
      io.to(sender.socketId).emit("getMsgs", { ...msg, isRead: true });
    }
  };

  const sendBooking = (data) => {
    const teacher = users.find((el) => el?.userId === data.teacher?._id);
    const admin = users.find((el) => el?.userId === "67a54300ca00dfbda18a47b1");
    if (teacher) {
      io.to(teacher.socketId).emit("getBooking", data);
    }
    if (admin) {
      io.to(admin.socketId).emit("getBooking", data);
    }
  };

  const cancelBooking = (data) => {
    const teacher = users.find((el) => el?.userId === data.teacher?._id);
    const admin = users.find((el) => el?.userId === "67a54300ca00dfbda18a47b1");
    if (teacher) {
      io.to(teacher.socketId).emit("getBooking", { ...data, canceled: true });
    }
    if (admin) {
      io.to(admin.socketId).emit("getBooking", { ...data, canceled: true });
    }
  };

  socket.on("userOnline", userOnline);
  socket.on("sendBooking", sendBooking);
  socket.on("cancelBooking", cancelBooking);
  socket.on("sendMsg", sendMsg);
  socket.on("seenMsg", seenMsg);
  socket.on("removeMsg", removeMsg);
  socket.on("updateMsg", updateMsg);
  socket.on("disconnect", userOffline);
};

module.exports = socketHandler;
