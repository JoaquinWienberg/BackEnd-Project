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
import session from "express-session"
import MongoStore from "connect-mongo"
faker.locale = "es"

const mongoDB = config.mongodb

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
app.use(express.json())
app.use(express.urlencoded({extended: true}))


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

// MONGO LOGIN


app.use(session({
    store: MongoStore.create({ mongoUrl: mongoDB.cnxStr,
                                mongoOptions: mongoDB.options}),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


// LOGINS
app.get('/login', async (req, res) => {
    res.sendFile('login.html', { root: __dirname +"/public/views"});
});


app.get('/logout', (req,res) => {
    const nombre = req.session.user
    req.session.destroy( err => {
        if(!err) {
            res.render('logout', {nombre: nombre})
        }
        else res.send({status: 'Logout ERROR', body: err})
    })
});

function auth(req, res, next) {
    if (req.session?.user !== '') {
        return next();
    }
    return res.redirect('/login');
}



app.post('/login', (req, res) => {
    let { nombre } = req.body;
    req.session.user = nombre;
    res.redirect('/home');
});

app.get('/home', auth, (req, res) => {
    const nombre = req.session.user
    if (req.session.user) {
        res.render('index', {nombre: nombre});
    } else {
        res.redirect('/login');
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

