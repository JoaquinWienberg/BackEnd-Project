import User from "../service/models.js"
import bCrypt from "bcrypt"
import passport from "passport"
import passportlocal from 'passport-local';
import mailNotification from "../service/notify.js";

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

                mailNotification("New user created", "User created", newUser.email, newUser.email)

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