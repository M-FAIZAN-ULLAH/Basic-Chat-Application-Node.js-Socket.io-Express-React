const express = require("express")
const cors = require("cors")
const http = require("http")
const  socketio  = require("socket.io")
const Filter = require("bad-words")
require("dotenv").config()
const { generateMessage } = require("./utilis/messages")
const { addUser, removeUser, getUser, getUserInRoom } = require("./utilis/users")

const app = express()

const server = http.Server(app)
app.use(cors())
const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000"
    }
})


// let message = "Welcome to platform!"

io.on("connection", (socket) => {
    console.log("New Socket Connection!")


    socket.on("join", ({ name, room }, callback) => {

        const {error, user} = addUser({id: socket.id,  username: name, room})
        console.log("username : ", name, " Room : ", room)
        console.log(user)

        if (error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit("Message", generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit("Message", generateMessage(`${user.username} Has joined!`))

        callback()

        // socket.emit, io.emit, socket.broadcast.emits
        // io.tio.emit, socket.broadcast.to.emit

    })

    socket.on("sendMessage", (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback("Profanity is not allowed")
        }

        io.emit("Message", generateMessage(message))
        callback("")
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit("Message", generateMessage(`${user.username} has left!`))
        }

        // io.emit("Message", generateMessage("A user has left"))
    })

    socket.on("sendLocation", (cords, callback) => {
        io.emit("LocationMessage", `https://google.com/maps?q=${cords.latitude}, ${cords.longitude}`)
        callback()
    })
})

const port = process.env.PORT

app.use(express.json())

app.get("/testing/result", (req,res) => {
    res.send("backend connected!")
})


server.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})