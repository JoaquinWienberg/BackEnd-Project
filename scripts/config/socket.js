import contenedor from "../pers/containers/products.js"
import config from "../pers/config.js"
import SystemChat from "../pers/containers/systemChat.js"
import logger from "../logs/logger.js"
import { displayNormalizedChat } from "./normalizr.js"


// chat class
const Contenedor = contenedor
const sysChat = new SystemChat("../../txt/chats.txt")
const stock = new Contenedor(config.mariaDb, "products")

const socketOn = () => {

    io.on('connection', async socket => {
        logger.info("New client connected")
        const messages = await sysChat.getAll()

        //console.log(normalizedChat)
        socket.emit('messages' , await displayNormalizedChat())  // Chat logs
        
        const assets = await stock.getAll()
        socket.emit("products", assets)

        
        socket.on("new-messages", async data => {
            const chats = data;
            chats.id = messages.length + 1
            messages.push(chats)
            await sysChat.saveMsg(chats)
            io.sockets.emit("messages", await displayNormalizedChat()) // Displays the new message in the chat
        })

        socket.on("new-product", async data => {
            const time = new Date()
            await stock.save(data.title, data.price, data.thumbnail, time, data.desc, data.stock, data.code)
            assets.push(data)
            io.sockets.emit("products", assets)
        })
    })

}

export default socketOn