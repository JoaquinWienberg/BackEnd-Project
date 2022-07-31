const express  = require("express")
const app = express();
const Contenedor = require("./products")



app.get("/productos", async (request, response) => {
    const stock = new Contenedor("./catalog.txt")
    response.send(await stock.getAll())
})

app.get("/productoRandom", async (request, response) => {
    const stock = new Contenedor("./catalog.txt")
    const products = await stock.getAll()
    const randomizer = Math.floor(Math.random() * parseFloat(await products.length)) + 1;
    response.send(await stock.getById(randomizer))
})

const server = app.listen(8080, () => {
    console.log(`Se ha dado de alta el servidor en el puerto ${server.address().port} `)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))




