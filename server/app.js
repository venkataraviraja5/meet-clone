const express = require("express")
const app = express()
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const mongoose = require("mongoose")
const newRoom = require("./routes/room")
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin",'*')
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS,GET,PUT,POST,DELETE,PATCH')
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization,Accept')
    next()
})


app.use(newRoom)

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3002",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`)

    socket.on("join-room",(data) =>{
        console.log(data)
        socket.join(data)
    })

    socket.on('message',(data)=>{
        console.log(data)
        io.to(data.id).emit('frontend-message',data)
    })
})


mongoose.connect(
    'mongodb+srv://raviraja2000:raviraja2000@cluster0.eabcdxj.mongodb.net/meetclone?retryWrites=true&w=majority'
).then(() => console.log("connected")).catch((err) => console.log(err))

server.listen(8080,()=>{
    console.log("server running on 8080")
})