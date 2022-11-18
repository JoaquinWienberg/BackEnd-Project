import path from "path";
import url from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function getRoot(req, res) {
    res.send('Welcome');
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {

        var user = req.user;
        res.render('index', {
            usuario: user.username,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email,
            phone: user.phone,
            photo: user.photo,
        });
    }
    else {
        console.log(__dirname)
        res.sendFile(__dirname + '/public/views/login.html');
    }
}

function getSignUp(req, res) {
    res.sendFile(__dirname + '/public/views/signup.html');
}


function postLogin(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(__dirname + '/public/views/index.html');
}

function postSignup(req, res) {
    const user = req.user;
    console.log(user);
    res.sendFile(__dirname + '/public/views/index.html');
}

function getFailLogin(req, res) {
    console.log('Error when logging in!');
    res.render('login-error', {
    });
}

function getFailsignup(req, res) {
    console.log('Sign up error!');
    res.render('signup-error', {
    });
}


function getLogout(req, res) {
    req.logout((err) => {
        if (err) { return next(err); }
        res.sendFile(__dirname + '/public/views/index.html');
    });
}

export default {
    getRoot,
    getLogin,
    postLogin,
    getFailLogin,
    getLogout,
    getSignUp,
    postSignup,
    getFailsignup }
