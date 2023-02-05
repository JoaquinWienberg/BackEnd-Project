import app from "./server.js"
import {Server as HttpServer} from "http"
import { Server as Socket} from "socket.io"
import config from "./scripts/config/config.js"
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
import normalizr from 'normalizr';
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
import dbConnect from "./scripts/pers/controllersdb.js"
import minimist from "minimist"
import cluster from "cluster"
import os from "os"
import logger from "./scripts/logs/logger.js"
import { chatDaoMongo } from "./scripts/pers/daos/factory.js"

// CHAT

const systemChat = chatDaoMongo

// Websocket (CHAT)

io.on('connection', async socket => {
    logger.info("New client connected")
    const messages = await systemChat.getAllMessages()
    socket.emit('messages' , messages)
    socket.on("new-messages", async data => {
        const chats = data;
        chats.id = messages.length + 1
        messages.push(chats)
        await systemChat.saveMessage(chats)
        io.sockets.emit("messages", await systemChat.getAllMessages()) // Displays the new message in the chat
    })

})

// Server listen

const numCpu = os.cpus().length 

const ports = { 
    default: { port: 8080, mode: "FORK"},
    alias: {p: "port", m: "mode"}
}

if (minimist(process.argv.slice(2), ports).mode == "CLUSTER" && cluster.isPrimary) {
    
    dbConnect(config.mongodb.cnxStr, err => {

        if (err) return logger.error('DB connection error', err);
        logger.info('Connected to DB!');
    })

    console.log(`Cores: ${numCpu}`)

    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    };

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Work ${worker.process.pid} died`);
        cluster.fork();
    });

} else {
    
    dbConnect(config.mongodb.cnxStr, err => {

        if (err) return logger.error('DB connection error', err);
        logger.info('Connected to DB!');

        httpServer.listen(process.env.PORT || 8080, () => {
            logger.info(`Server is listening in port: ${httpServer.address().port} `)
        })

        httpServer.on("error", error => logger.error(`Server error ${error}`))

    })

}



