import { io } from "socket.io-client"

// const socket = io.connect("http://localhost:9999")

const socket = io(`${process.env.REACT_APP_ROOT_API}`, {
  autoConnect: false
})

export default socket
