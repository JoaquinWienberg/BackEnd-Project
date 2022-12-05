import path from "path";
import url from 'url';
import { fileURLToPath } from 'url';
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({
    path: path.resolve(path.join(__dirname, "../../.env"))
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
            host: process.env.HOST,
            user: process.env.USERSQL,
            password: '',
            database: process.env.SQLDATABASE
        }
    },
    mongodb: {
        cnxStr: process.env.MONGODB,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

