import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv"

// dotenv

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(path.join(__dirname, "../.env"))
})

export default {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/ecommerce.sqlite`
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'stockdatabase'
        }
    },
    mongodb: {
        cnxStr: process.env.mongodb,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

