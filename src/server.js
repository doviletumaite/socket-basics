import express from "express"
import http from "http"
import {Server} from "socket.io"
import onSocketConnected from "./socketio/connection.js"
import authorizeSocket from "./middlewares/authorizeSocket.js"
import conversationHandler from "./services/conversation.js"

const app = express()
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server, {transports:['websocket']})
io.use(authorizeSocket)

io.on('connection',(socket)=> onSocketConnected(io, socket))
app.use((req, res, next) => {
    req.io  = io
    next()
})
app.use("/conversations", conversationHandler)
server.listen(5001, () => console.log('Server running'))