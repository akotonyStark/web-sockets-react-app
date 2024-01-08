const express = require('express')
const app = express()
const http  = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)



const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`)


    //join event
    socket.on("join_room", (data) => {
        socket.join(data)
    })

    //listen for 'send_message' emitted event
    socket.on("send_message", (data) => {
        //socket.broadcast.emit('receive_message', data)
        socket.to(data.room).emit('receive_message', data)
    })
})

// app.get(`/`, (req,res) => {
//     res.send('Hello world api')
// })


// app.listen('3000', () => {
//     console.log('listening on PORT 3000')
// })

const PORT = 3000  

server.listen(PORT, () => {
        console.log(`listening on PORT ${PORT}`)
})
