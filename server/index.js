const app = require('express')()
const http = require('http').createServer(app)
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true
    }
});

io.on('connection', socket => {

    console.log('connected')

    socket.on('join room', (room, user, users, callback) => {

    });

    socket.on('send message', ({ sender, receiver, message, messages, room }, callback) => {

    })

    socket.on('read messages', ({ reader, roomId }, callback) => {

    })

    socket.on('disconnect', function (reason) {
        console.log('connected')
        if (reason === "ping timeout") {
        }
    });

})

httpServer.listen(3001, function () {
    console.log('listening on port 3001')
})