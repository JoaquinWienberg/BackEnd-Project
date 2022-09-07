import app from "./server.js"
import {Server as HttpServer} from "http"
import { Server as Socket} from "socket.io"
import contenedor from "./containers/products.js"
import config from "./scripts/config.js"
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
// chat class
const Contenedor = contenedor
const sysChat = new Contenedor(config.sqlite3, "messages")
const stock = new Contenedor(config.mariaDb, "products")


// Websocket

const messages2 = [] // Contains the chat messages

io.on('connection', async socket => {
    console.log("New client connected")
    const messages = await sysChat.getAll()
    socket.emit('messages' , messages)  // Chat logs
    
    const assets = await stock.getAll()
    socket.emit("products", assets)

    
    socket.on("new-messages", data => {
        messages.push(data)
        sysChat.saveMsg(data.author, data.timedate, data.text)
        io.sockets.emit("messages", messages) // Displays the new message in the chat
    })

    socket.on("new-product", async data => {
        const time = new Date()
        await stock.save(data.title, data.price, data.thumbnail, time, data.desc, data.stock, data.code)
        assets.push(data)
        io.sockets.emit("products", assets)
    })
})

// Server listen

httpServer.listen(8080, () => {
    console.log(`Server is listening in port: ${httpServer.address().port} `)
})

httpServer.on("error", error => console.log(`Server error ${error}`))