// Express setup
const express  = require("express")
const { Router } = express;
const handlebars = require('express-handlebars');
const app = express();
// Stock class
const Contenedor = require("./products")
const stock = new Contenedor("./catalog.txt")

// Router
const routerProducts = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))




// Server interactions

/*routerProducts.get("/productos", async (req, res) => {
    const reStock = await stock.getAll()
    console.log(reStock)
    res.send(reStock)
})*/

routerProducts.get("/productoRandom", async (req, res) => {
    const getProducts = await stock.getAll()
    const randomizer = Math.floor(Math.random() * parseFloat(await getProducts.length)) + 1;
    const reStock = await stock.getById(randomizer)
    res.send(reStock)
})

routerProducts.get("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.getAll()
    const selStock = await stock.getById(parseInt(id))
    if ( parseInt(id) <= reStock.length) {
    res.send(selStock)} else {
    res.send("Producto no encontrado")
    }
})

routerProducts.post("/productos", async (req, res) => {
    const newProd = req.body
    console.log(req.body)
    await stock.save(newProd.title, newProd.price, newProd.thumbnail)
    console.log("Post corrido")
    //res.json(newProd)
})

routerProducts.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const reStock = await stock.updateById(id, updatedProd.title, updatedProd.price, updatedProd.thumbnail);
    res.json(reStock)
})

routerProducts.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.deleteById(id);
    res.json(reStock)
})

routerProducts.get('/productosEjs', async (req, res) => {
    const reStock = await stock.getAll()
    res.render('main', {displayProducts: reStock, stockExists: true});
})

routerProducts.get('/nuevoproductoEjs', (req, res) => {
    res.render('createProduct',);
})



// app setting
app.set("view engine", "ejs");
app.set("views", "./views");

// Route setting

app.use('/api', routerProducts)
app.use(express.static('public'));


// Server listen

const server = app.listen(8080, () => {
    console.log(`Se ha dado de alta el servidor en el puerto ${server.address().port} `)
})

server.on("error", error => console.log(`Error en el servidor ${error}`))




