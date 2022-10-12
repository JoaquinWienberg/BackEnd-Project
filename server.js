// Express setup
import express from "express"
import {Server as HttpServer} from "http"
import handlebars from "express-handlebars"
import contenedor from "./containers/products.js"
import config from "./scripts/config.js"
import path from "path";
import url from 'url';
import { fileURLToPath } from 'url';
import adminsCheck from "./scripts/admin.js"
import routerProducts from "./scripts/routerProducts.js"
import faker from "faker";
import session from "express-session"
import bCrypt from "bcrypt"
import passport from "passport"
import passportlocal from 'passport-local';
import MongoStore from "connect-mongo"
import routes from "./routes.js"
import User from "./scripts/models.js"
faker.locale = "es"
const LocalStrategy = passportlocal.Strategy;
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

// Register and Login

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
},

    (req, username, password, done) => {
        User.findOne({"username": username}, (err, user) => {
            if (err) {
                return done(err)
            }

            if (user) {
                return done(null,false)
            }

            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }

            User.create(newUser,(err,userWithid) => {
                if (err) {
                    return done(err);
                }

                return done(null, userWithid);
            })
        })
    }
))

passport.use ("login", new LocalStrategy(
    (username, password, done) => {
        User.findOne ({ username }, (err, user) => {
            if (err) {
                return done(err)
            }

            if (!user) {
                return done(null, false)
            }

            if (!isValidPassword(user, password)) {
                return done(null, false)
            }

            return done (null, user)
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, done)
})

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

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

app.use(passport.initialize());
app.use(passport.session());


// Login and Logout
/*app.get('/login', async (req, res) => {
    res.sendFile('login.html', { root: __dirname +"/public/views"});
});*/

app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', {
    failureRedirect: '/faillogin'
}), routes.postLogin);
app.get('/faillogin', routes.getFailLogin);


/*app.get('/logout', (req,res) => {
    const nombre = req.session.user
    req.session.destroy( err => {
        if(!err) {
            res.render('logout', {nombre: nombre})
        }
        else res.send({status: 'Logout ERROR', body: err})
    })
});*/

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

/*
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
})*/

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

