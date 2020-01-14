export default io => {
  // Currently lets just keep records of user id & their socket id
  let userSockets = {};

  // Set socket.io listeners.
  io.on("connection", socket => {
    socket.on("disconnect", () => {
      const userId = userSockets[socket.id];
      delete userSockets[socket.id];

      if (userId) {
        io.sockets.emit("user-offline", userId);
      }
    });

    socket.on("online-ping", userId => {
      if (userId) {
        userSockets[socket.id] = userId;
        socket.broadcast.emit("user-online", userId);

        setTimeout(() => {
          // Send currently online users
          socket.emit("online-users", Object.values(userSockets));
        }, 1000);
      }
    });

    socket.on("enter-conversation", conversation => {
      socket.join(conversation);
    });

    socket.on("leave-conversation", conversation => {
      socket.leave(conversation);
    });

    socket.on("send-message", message => {
      socket.broadcast.to(message.conversationId).emit("new-message", message);
    });
  });
};
