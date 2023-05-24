const dotenv = require("dotenv");

dotenv.config({ path: "../Socket/config.env" });

const io = require("socket.io")(process.env.PORT, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let activeUsers = [];
io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("getUsers", activeUsers);
    console.log(activeUsers);
  });

  // Send Message

  socket.on("send", (data) => {
    if (data && data.receiverId) {
      const { receiverId } = data;
      const user = activeUsers.find(
        (user) => user.userId.toString() === receiverId.toString()
      );
      console.log(user);
      if (user) {
        io.to(user.socketId);
        io.emit("receive", data);
      } else {
        console.log("User not found");
      }
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", activeUsers);
  });
});
