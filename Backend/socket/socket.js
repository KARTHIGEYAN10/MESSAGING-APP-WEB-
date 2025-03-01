const { Server } = require("socket.io"); // CommonJS import for socket.io
const http = require("http"); // CommonJS import for http
const express = require("express"); // CommonJS import for express


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:4000"], // Allow frontend access
        methods: ["GET", "POST"],
    },
});
const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
}
const userSocketMap={}
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    const userId=socket.handshake.query.userId
    if(userId != "undefined"){
        userSocketMap[userId]=socket.id
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    });
});

module.exports = { app, io, server, getReceiverSocketId };// Use export instead of module.exports
