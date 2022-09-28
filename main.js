import app from "./server.js"
import {Server as HttpServer} from "http"
import { Server as Socket} from "socket.io"
import contenedor from "./containers/products.js"
import config from "./scripts/config.js"
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
import SystemChat from "./containers/systemChat.js"
import { normalize, schema, denormalize} from "normalizr";
import util from "util";
import mongoose, { model } from 'mongoose' 
import { stringify } from "querystring"

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


//const normalizedChat = normalize(testChats, chatLog);

const asdchat = {
    messages: [
    {
    author: {
        id: "mail1",
        name: "Tim",
        surname: "Del",
        age: 22,
        alias: "Rob",
        avatar: "img",
    },
    text:"Hey!"
    },
        {
    author: {
        id: "mail2",
        name: "Jam",
        surname: "Rtu",
        age: 23,
        alias: "Dan",
        avatar: "img",
    },
    text:"Hello!"
    },
    {
    author: {
        id: "mail2",
        name: "Jam",
        surname: "Rtu",
        age: 23,
        alias: "Dan",
        avatar: "img",
    },
    text:"Hello sir!"
    },
]}

// Websocket

//const messages2 = [] // Contains the chat messages

io.on('connection', async socket => {
    console.log("New client connected")
    const messages = await sysChat.getAll()
    
    const authorSchema = new schema.Entity("author");
    const textSchema = new schema.Entity("text");
    const chatLog = new schema.Entity("chatLog",{
        author: authorSchema,
        text: textSchema,
    });

    function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
    }
    const normalizedChat = normalize(asdchat, chatLog);
    
    const denormalizedEmpresa = denormalize(normalizedChat.result, chatLog, normalizedChat.chatLog);
    print(normalizedChat);
    //console.log(normalizedChat)
    socket.emit('messages' , messages)  // Chat logs
    
    const assets = await stock.getAll()
    socket.emit("products", assets)

    
    socket.on("new-messages", data => {
        messages.push(data)
        sysChat.saveMsg(data)
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