// Express setup
import session from "express-session"
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from 'url';
import config from "./config.js"

//const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv

dotenv.config({
    path: path.resolve(path.join(__dirname, "../../.env"))
})

const sessionInfo = session({
    store: MongoStore.create({ mongoUrl: process.env.MONGODB,
                                mongoOptions: config.mongodb.options}),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
})

export default sessionInfo