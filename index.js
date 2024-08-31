const express = require("express");
const http = require('http');
const app = express();
const path = require('path');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.on("userMessage", (message) => {
        io.emit("message", message);
    });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));
});

server.listen(9000, () => console.log("server started at 9000"));
