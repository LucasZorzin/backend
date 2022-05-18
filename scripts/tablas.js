//! SQLite3
const knexSQLite3 = require("knex")(config.sqlite3);
(async () => {
    try {
        await knexSQLite3.schema
            .dropTableIfExists("mensajes")
            .createTable("mensajes", (table) => {
                table.dateTime("time");
                table.string("author", 50).notNullable();
                table.string("text", 200).notNullable();
            });
        console.log("tabla  mensajes creada usando MYSQLite3");
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        knex.destroy();
    }
})();

//! MariaDB
const config = require("../options/config");
const knex = require("knex")(config.mariaDb);
(async () => {
    try {
        await knex.schema
            .dropTableIfExists("productos")
            .createTable("productos", (table) => {
                table.increments("id");
                table.string("nombre", 50).notNullable();
                table.integer("precio");
                table.string("thumbnail", 100).notNullable();
            });
        console.log("Tabla Productos creada con MariaDb");
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        knex.destroy();
    }
})();
