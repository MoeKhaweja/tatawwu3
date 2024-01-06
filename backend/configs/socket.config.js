// socketHandler.js
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("authenticate", (token) => {
      if (isValidToken(token)) {
        // If the token is valid, allow the connection
        console.log(`A user connected with token: ${token}`);
        handleValidConnection(socket);
      } else {
        // If the token is invalid, disconnect the socket
        console.log(`Unauthorized connection attempt with token: ${token}`);
        socket.disconnect(true);
      }
    });
  });

  function isValidToken(token) {
    // Implement your token validation logic here
    // Example: check token against a database or secret key
    // Return true if the token is valid, false otherwise
    // For demonstration purposes, consider all tokens as valid
    return true; // Replace this with your validation logic
  }

  function handleValidConnection(socket) {
    // Handle various events and operations after successful connection
    socket.on("join", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("message", (data) => {
      io.to(data.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  }
};

module.exports = { socketHandler };
