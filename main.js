import app from "./server.js"
import {Server as HttpServer} from "http"
import { Server as Socket} from "socket.io"
import contenedor from "./containers/products.js"
import config from "./scripts/config.js"
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
import SystemChat from "./containers/systemChat.js"
import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
import util from "util";


// chat class
const Contenedor = contenedor
//const sysChat = new Contenedor(config.sqlite3, "messages")
const sysChat = new SystemChat("./txt/chats.txt")
const stock = new Contenedor(config.mariaDb, "products")

// NORMALIZR
async function getChat () {
    const data = await sysChat.getAll()
    return data
}
const testChats = getChat()

// NORMALIZR

// SCHEMAS
    
const authorSchema = new schema.Entity('author', {}, {idAttribute: 'email'});
const textSchema = new schema.Entity('texts', {author: authorSchema}, {idAttribute: 'id'}) ;
const chatLogSchema = new schema.Entity('Chat',
        { messages: [textSchema]}, {idAttribute: 'id'});



const normalizeChat = (data) => normalize(data, chatLogSchema)

async function displayNormalizedChat() {
    const messages = await sysChat.getAll();
    const normalizedItem = normalizeChat({ id: 'messages', messages });
    console.log(util.inspect(normalizedItem, false, 12, true));
    return normalizedItem
}

// Websocket

io.on('connection', async socket => {
    console.log("New client connected")
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

// Server listen

httpServer.listen(8080, () => {
    console.log(`Server is listening in port: ${httpServer.address().port} `)
})

httpServer.on("error", error => console.log(`Server error ${error}`))