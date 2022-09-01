// Express setup
const express  = require("express")
const { Router } = express;
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io") 
const handlebars = require('express-handlebars');
const app = express();
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const { Socket } = require("dgram")
// Stock class
const Contenedor = require("./containers/products.js")
const stock = new Contenedor("./txt/catalog.txt")
// Chat class
const newCart =  new Contenedor("./txt/cart.txt")


// Router
const routerProducts = new Router();
const cart = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))
cart.use(express.json())
cart.use(express.urlencoded({extended: true}))

// HandleBars

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/public/views/layouts',
        partialsDir: __dirname + '/public/views/partials'
    })
);

// Admin settings

const adminOn = true

function nonAdminError(route, method) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `route '${route}' method '${method}' not available`
    } else {
        error.descripcion = 'not available'
    }
    return error
}

function adminsCheck(req, res, next) {
    if (!adminOn) {
        res.json(nonAdminError())
    } else {
        next()
    }
}

// Products Server interactions

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
    res.send("Product not found")
    }
})

routerProducts.post("/productos", adminsCheck, async (req, res) => {
    const newProd = req.body
    console.log(req.body)
    await stock.save(newProd.title, newProd.price, newProd.thumbnail, newProd.time, newProd.desc, newProd.stock, newProd.code)
    console.log("Post done!")
    //res.json(newProd)
})

routerProducts.put("/productos/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const reStock = await stock.updateById(id, updatedProd.title, updatedProd.price, updatedProd.thumbnail, updatedProd.time, updatedProd.desc, updatedProd.stock, updatedProd.code);
    res.json(reStock)
})

routerProducts.delete("/productos/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.deleteById(id);
    res.json(reStock)
})

routerProducts.get('/productos', async (req, res) => {
    const reStock = await stock.getAll()
    res.json(reStock);
})


routerProducts.get('/products', async (req, res) => {
    res.sendFile('index.html', { root: __dirname + "/public/html"});
});

// Cart Server interactions

cart.get('/cartdb', async (req, res) => {
    const reStock = await newCart.getAll()
    res.json(reStock);
})

/*cart.get("/cart/:id", async (req, res) => {
    const { id } = req.params;
    const cart = await newCart.getAll()
    const selCart = await newCart.getById(parseInt(id))
    if ( parseInt(id) <= selCart.length) {
    res.send(selCart)} else {
    res.send("Product not found")
    }
})*/

cart.post("/cart", async (req, res) => {
    const cart = req.body
    await newCart.saveCart(cart)
    console.log("Post done!")
})

cart.post("/cart/:cart/:id", async (req, res) => {
    const { id , cart} = req.params;
    const prod = req.body
    await newCart.addProductToCart(id, cart, prod)
    console.log("Post done!")
})


cart.delete("/cart/:id", async (req, res) => {
    const { id } = req.params;
    const reStock = await newCart.deleteById(id);
    res.json(reStock)
})

cart.delete("/cart/:cart/:id", async (req, res) => {
    const { id , cart} = req.params;
    await newCart.deleteProductFromCart(id, cart)
    res.json(newCart)
})

cart.get('/productos', async (req, res) => {
    const reStock = await stock.getAll()
    res.json(reStock);
})


cart.get('/cart', async (req, res) => {
    res.sendFile('cart.html', { root: __dirname + "/public/html"});
});


// Route setting

app.use('/api', routerProducts)
app.use('/api', cart)
app.use(express.static('public'));
app.use((req, res, next) => {
    errorObj = {msg:"Error 404 - Can't find that!", pathErr: req.path }
    res.status(404).send(errorObj)
})


module.exports = app

