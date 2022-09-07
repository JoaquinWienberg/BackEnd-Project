import knex from 'knex'
import config  from './config.js'


// Maria DB Products

const mariaDbClient = knex(config.mariaDb)

try {

    //Implementar creación de tabla

    await mariaDbClient.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('title', 15).notNullable();
        table.float('price');
        table.string('desc', 45).notNullable();
        table.string('timestamp', 45).notNullable();
        table.string('thumbnail', 150).notNullable();
        table.float('stock').notNullable();
        table.string('code', 45).notNullable();

    });

    console.log('MariaDB Table created!')
} catch (error) {
    console.log('Error when creating MariaDB Table')
    console.log(error)
} finally {
    mariaDbClient.destroy()
}


// SQlite3 messages db

const sqliteClient = knex(config.sqlite3)

try {
    

    //Implementar creación de tabla

    await sqliteClient.schema.createTable('messages', table => {
        table.string('author', 25).notNullable();
        table.string('time');
        table.string('text', 150).notNullable();
    });

    console.log('Successfuly created sqlite3 table')
} catch (error) {
    console.log('Error when creating sqlite3 table')
} finally {
    sqliteClient.destroy()
}

