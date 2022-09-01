const app = require("./server.js")
const { Server: HttpServer } = require("http")
const httpServer = new HttpServer(app)

// Server listen

httpServer.listen(8080, () => {
    console.log(`Server is listening in port: ${httpServer.address().port} `)
})

httpServer.on("error", error => console.log(`Server error ${error}`))