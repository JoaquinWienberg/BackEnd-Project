import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv"

// dotenv

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(path.join(__dirname, "../../.env"))
})

const mode = process.env.mode

let mongodb

if (mode == "DEV") {
    mongodb = process.env.MONGODBDEV
} else {
    mongodb = process.env.MONGODB
}

export default {
    mongodb: {
        cnxStr: mongodb,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

