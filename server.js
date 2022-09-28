// Express setup
import express from "express"
import {Server as HttpServer} from "http"
import handlebars from "express-handlebars"
import contenedor from "./containers/products.js"
import config from "./scripts/config.js"
import path from "path";
import { fileURLToPath } from 'url';
import adminsCheck from "./scripts/admin.js"
import routerProducts from "./scripts/routerProducts.js"
import faker from "faker";
faker.locale = "es"

const { Router } = express;
const app = express();

// Stock class
const Contenedor = contenedor
const stock = new Contenedor(config.mariaDb, "products")

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Router

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


routerProducts.get('/products', async (req, res) => {
    res.sendFile('index.html', { root: __dirname +"/public/html"});
});

app.get("/api/productos-test",  async (req, res) => {
    const allProducts = await stock.randomProd()
    if (allProducts.length > 0) {
        res.render('main', {displayProducts: allProducts, stockExists: true});
    } else {
        res.render('main', {stockExists: false});
    }
})

// app setting
app.set("view engine", "hbs");
app.set("views", "./public/views");

// Route setting

app.use('/api', routerProducts)
app.use(express.static('public'));
app.use((req, res, next) => {
    const errorObj = {msg:"Error 404 - Can't find that!", pathErr: req.path }
    res.status(404).send(errorObj)
})

export default app

