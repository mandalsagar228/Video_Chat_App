import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();
io.on("connection", (socket) => {
  //listening the connection  from the client side with same event called "connection"
  console.log("socket connected-", socket.id);

  socket.on("room:join", (data) => {
    //getting data from the client side with event "room:join"
    console.log(data);
    const { email, room } = data; // data is sent from client sid.
    emailToSocketIdMap.set(email, socket.id); //storing email and socket id
    socketIdToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id }); //it will emit the user with partiular room id whose event is "user:joined"
    socket.join(room); //join the user with room id
    io.to(socket.id).emit("room:join", data);
  });
});
