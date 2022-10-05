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
        cnxStr: "mongodb+srv://Joaquin:BN633XKnqPfWKOmr@cluster0.wjqzet9.mongodb.net/eCommerce",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    }
}

