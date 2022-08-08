// Express setup
const express  = require("express")
const { Router } = express;
const app = express();
// Stock class
const Contenedor = require("./products")


const routerProducts = new Router();


//routerProducts.use(express.static('public'))
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))


// Server interactions
routerProducts.get("/productos", async (req, res) => {
    const stock = new Contenedor("./catalog.txt")
    const reStock = await stock.getAll()
    res.send(reStock)
})

routerProducts.get("/productoRandom", async (req, res) => {
    const stock = new Contenedor("./catalog.txt")
    const getProducts = await stock.getAll()
    const randomizer = Math.floor(Math.random() * parseFloat(await getProducts.length)) + 1;
    const reStock = await stock.getById(randomizer)
    res.send(reStock)
})

routerProducts.get("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const stock = new Contenedor("./catalog.txt")
    const reStock = await stock.getAll()
    const selStock = await stock.getById(parseInt(id))
    if ( parseInt(id) <= reStock.length) {
    res.send(selStock)} else {
    res.send("Producto no encontrado")
    }
})

routerProducts.post("/productos", async (req, res) => {
    const stock = new Contenedor ("./catalog.txt")
    const newProd = req.body
    console.log(req.body)
    await stock.save(newProd.title, newProd.price, newProd.thumbnail)
    console.log("Post corrido")
    res.json(newProd)
})

routerProducts.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const stock = new Contenedor("./catalog.txt")
    const reStock = await stock.updateById(id, updatedProd.title, updatedProd.price, updatedProd.thumbnail);
    res.json(reStock)
})

routerProducts.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const stock = new Contenedor("./catalog.txt")
    const reStock = await stock.deleteById(id);
    res.json(reStock)
})


// Route setting

app.use('/api', routerProducts)
app.use(express.static('public'));
// Server listen

const server = app.listen(8080, () => {
    console.log(`Se ha dado de alta el servidor en el puerto ${server.address().port} `)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))




