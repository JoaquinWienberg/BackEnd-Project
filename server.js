// Express setup
import express from "express"
import handlebars from "express-handlebars"
import config from "./scripts/pers/config.js"
import path from "path";
import { fileURLToPath } from 'url';
import routerProducts from "./scripts/rout/routerProducts.js"
import faker from "faker";
import session from "express-session"
import passport from "./scripts/config/signIn.js"
import MongoStore from "connect-mongo"
import routes from "./scripts/service/routes.js"
import dotenv from "dotenv"
import logger from "./scripts/service/logger.js"
import app from "./scripts/rout/app.js"

faker.locale = "es"
const mongoDB = config.mongodb

//const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv

dotenv.config({
    path: path.resolve(__dirname, ".env")
})

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

// MONGO LOGIN

const credentials = process.env.MONGODB

app.use(session({
    store: MongoStore.create({ mongoUrl: credentials,
                                mongoOptions: mongoDB.options}),
    secret: "secret",
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
app.post('/signup', passport.authenticate('signup', {
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
    console.log(user);
    const nombre = req.session.user
    if (req.session.user) {
        res.render('index', {nombre: nombre});
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

