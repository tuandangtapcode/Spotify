import express from "express"
import http from "http"
import { Server } from 'socket.io'
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connect from './config/index.js'
import routes from './routes/index.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: "http://localhost:3000" })

connect()

app.use(cors({
  origin: true,
  credentials: true,
}))

app.use(express.json())

routes(app)

io.on("connection", (socket) => {

  console.log(`người dùng ${socket.id} đã kết nối`)

  socket.on('send-comment', (data) => {
    io.sockets.emit('get-comments', data)
  })

  socket.on('send-deactive', (data) => {
    io.sockets.emit('get-deactive', data)
  })

  socket.on('send-notification', (data) => {
    io.sockets.emit('get-notification', data)
  })

  socket.on('disconnect', () => {
    console.log(`người dùng ${socket.id} đã ngắt kết nối`)
  })
})

server.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`)
})
