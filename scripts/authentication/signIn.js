import User from "../models.js"
import mailNotification from "../notify.js"
import bCrypt from "bcrypt"
import passport from "passport"
import passportlocal from 'passport-local';

const LocalStrategy = passportlocal.Strategy;

passport.use("signup", new LocalStrategy({
    passReqToCallback: true
},

    (req, email, password, done) => {

        
        User.findOne({"email": email}, (err, user) => {
            if (err) {
                return done(err)
            }

            if (user) {
                return done(null,false)
            }

            const newUser = {
                username: req.body.usernameId,
                password: createHash(password),
                email: email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                photo: req.file.filename
            }

            User.create(newUser,(err,userWithid) => {
                if (err) {
                    return done(err);
                }

                let mailBody = `<div><h4>Client: ${newUser.firstName} ${newUser.lastName}</h4><h4>Client email: ${email}</h4></div>`

                mailNotification("New user created - Node.js", "A new user has been created!", mailBody )

                return done(null, userWithid);
            })
        })
    }
))

passport.use ("login", new LocalStrategy(
    (email, password, done) => {
        User.findOne ({ email }, (err, user) => {
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

export default passport