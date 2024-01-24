const socketIO = require("socket.io");

const socket = async (server) => {
  const io = socketIO(server); // Attach Socket.IO to the HTTP server

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("send-message", (message, room, sender) => {
      if (room) {
        console.log(room, sender);
        // Handle message for all clients
        socket.to(room).emit("receive-message", message, sender);
        const find = async () => {
          const target = await Room.findById(room);
          const fieldsToUpdate = {
            chat: [
              ...target.chat,
              {
                message: message,
                sender: sender,
              },
            ],
            lastMessage: {
              message: message,
              sender: sender,
              createdAt: Date.now(),
            },
          };
          await target.updateOne(fieldsToUpdate, {
            new: true,
            runValidators: true,
          });
          console.log("done");
        };
        find();
      } else {
      }
    });

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Joined ${room}`);
    });
  });
};

module.exports = { socket };
