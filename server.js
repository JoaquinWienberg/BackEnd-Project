// Express setup
import express from "express"
import handlebars from "express-handlebars"
import contenedor from "./containers/products.js"
import config from "./scripts/config.js"
import path from "path";
import { fileURLToPath } from 'url';
import routerProducts from "./scripts/routerProducts.js"
import faker from "faker";
import session from "express-session"
import passport from "./scripts/authentication/signIn.js"
import MongoStore from "connect-mongo"
import routes from "./routes.js"
import dotenv from "dotenv"
import logger from "./scripts/logger.js"
import multer from "multer"

faker.locale = "es"
const mongoDB = config.mongodb

const { Router } = express;
const app = express();

// Stock class
const Contenedor = contenedor
const stock = new Contenedor(config.mariaDb, "products")

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv

dotenv.config({
    path: path.resolve(__dirname, ".env")
})

// Router

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Multer setup

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage})

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

// MONGO LOGIN

const credentials = process.env.MONGODB

app.use(session({
    store: MongoStore.create({ mongoUrl: credentials,
                                mongoOptions: mongoDB.options}),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', {
    failureRedirect: '/faillogin'
}), routes.postLogin);
app.get('/faillogin', routes.getFailLogin);
app.get('/logout', routes.getLogout);

//SIGNUP
app.get('/signup', routes.getSignUp);
app.post('/signup', upload.single("upload"),
    passport.authenticate('signup', {
    failureRedirect: '/failsignup'
}), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//Last part
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.get('/home', checkAuthentication, (req, res) => {
    const { user } = req;
    const nombre = req.session.user
    if (req.session.user) {
        res.render('index', {nombre: nombre, photo: req.body.photo});
    } else {
        res.redirect('/login');
    }
});

// app setting
app.set("view engine", "hbs");
app.set("views", "./public/views");

// Route setting

app.use('/api', routerProducts)
app.use(express.static('public'));
app.use((req, res, next) => {
    const errorObj = {msg:"Error 404 - Can't find that!", pathErr: req.path }
    logger.warn("invalid URL")
    res.status(404).send(errorObj)
})

export default app

