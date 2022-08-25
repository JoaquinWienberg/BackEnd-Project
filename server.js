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
const Contenedor = require("./products")
const stock = new Contenedor("./txt/catalog.txt")
// Chat class
const SystemChat = require("./chat")
const sysChat = new SystemChat("./txt/chats.txt")

// Websocket

const messages2 = [] // Contains the chat messages






// Router
const routerProducts = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))

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

// Server interactions

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

routerProducts.post("/productos", async (req, res) => {
    const newProd = req.body
    console.log(req.body)
    await stock.save(newProd.title, newProd.price, newProd.thumbnail)
    console.log("Post done!")
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

routerProducts.get('/productos', async (req, res) => {
    const reStock = await stock.getAll()
    res.render('main', {displayProducts: reStock, stockExists: true});
})

routerProducts.get('/nuevoproducto', (req, res) => {
    res.render('createProduct',);
})

routerProducts.get('/products', async (req, res) => {
    res.sendFile('index.html', { root: __dirname + "/public/html"});
});


// app setting
app.set("view engine", "hbs");
app.set("views", "./public/views");

// Route setting

app.use('/', routerProducts)
app.use(express.static('public'));

io.on('connection', async socket => {
    console.log("New client connected")
    const messages = await sysChat.getMsg()
    socket.emit('messages' , messages)  // Chat logs
    
    const assets = await stock.getAll()
    socket.emit("products", assets)

    
    socket.on("new-messages", data => {
        messages.push(data)
        sysChat.save(data)
        io.sockets.emit("messages", messages) // Displays the new message in the chat
    })

    socket.on("new-product", async data => {
        await stock.save(data.title, data.price, data.thumbnail)
        assets.push(data)
        io.sockets.emit("products", assets)
    })
})

// Server listen

httpServer.listen(8080, () => {
    console.log(`Server is listening in port: ${httpServer.address().port} `)
})

httpServer.on("error", error => console.log(`Server error ${error}`))




