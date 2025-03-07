let users = [];
const rooms = {};

const socketHandler = (socket, io) => {
  // console.log("User connected:", socket.id);

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

  // Chat
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

  // Booking
  const sendBooking = (data) => {
    const teacher = users.find((el) => el?.userId === data.teacher?._id);
    const admin = users.find((el) => el?.userId === "67a54300ca00dfbda18a47b1");
    if (teacher) {
      io.to(teacher.socketId).emit("getBooking", { ...data, send: true });
    }
    if (admin) {
      io.to(admin.socketId).emit("getBooking", { ...data, send: true });
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
  const acceptedBooking = (data) => {
    const teacher = users.find((el) => el?.userId === data?.teacher?._id);
    const student = users.find((el) => el?.userId === data?.student?._id);
    if (teacher) {
      io.to(teacher.socketId).emit("getBooking", { ...data, accepted: true });
    }
    if (student) {
      io.to(student.socketId).emit("getBooking", { ...data, accepted: true });
    }
  };
  const rejectedBooking = (data) => {
    const teacher = users.find((el) => el?.userId === data?.teacher?._id);
    const student = users.find((el) => el?.userId === data?.student?._id);
    if (teacher) {
      io.to(teacher.socketId).emit("getBooking", { ...data, rejected: true });
    }
    if (student) {
      io.to(student.socketId).emit("getBooking", { ...data, rejected: true });
    }
  };

  // Lesson
  const addLesson = (data) => {
    socket.broadcast.emit("getLesson", { ...data, added: true });
  };
  const removeLesson = (data) => {
    socket.broadcast.emit("getLesson", { ...data, removed: true });
  };
  const finishedLesson = (data) => {
    const teacher = users.find((el) => el?.userId === data?.teacher?._id);
    const student = users.find((el) => el?.userId === data?.student?._id);
    if (teacher) {
      io.to(teacher.socketId).emit("getLesson", { ...data, finished: true });
    }
    if (student) {
      io.to(student.socketId).emit("getLesson", { ...data, finished: true });
    }
  };

  const joinMeeting = (data) => {
    const { roomId, user } = data;
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    if (rooms[roomId]) {
      rooms[roomId] = [
        ...rooms[roomId]?.filter((e) => e?.userId !== user?.userId),
        user,
      ];
    }

    socket.to(roomId).emit("userJoined", {
      roomId,
      users: rooms[roomId],
    });
  };

  // Users Online
  socket.on("userOnline", userOnline);

  // Booking
  socket.on("joinMeeting", joinMeeting);

  // Booking
  socket.on("sendBooking", sendBooking);
  socket.on("acceptedBooking", acceptedBooking);
  socket.on("rejectedBooking", rejectedBooking);
  socket.on("cancelBooking", cancelBooking);

  // Lesson
  socket.on("addLesson", addLesson);
  socket.on("removeLesson", removeLesson);
  socket.on("finishedLesson", finishedLesson);

  // Chat
  socket.on("sendMsg", sendMsg);
  socket.on("seenMsg", seenMsg);
  socket.on("removeMsg", removeMsg);
  socket.on("updateMsg", updateMsg);

  socket.on("disconnect", userOffline);
};

module.exports = socketHandler;
