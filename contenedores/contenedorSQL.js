const knex = require("knex");

class ContenedorSQL {
    constructor(config, tabla) {
        this.knex = knex(config);
        this.tabla = tabla;
    }

    async createTableMessages() {
        return this.knex.schema.dropTableIfExists('mensajes')
            .finally(() => {
                return this.knex.schema.createTable('mensajes', table => {
                    table.string('author');
                    table.string('text');
                    table.string('date');
                })
            })
    }

    async createTableProducts() {
        return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', table => {
                    table.string('title');
                    table.float('price');
                    table.string('thumbnail');
                })
            })
    }

    async getAll() {
        return this.knex.from(this.tabla).select('*');
    }

    async getAllM() {
        return this.knex.from(this.tabla).select('*');
    }

    async save(elem) {
        return this.knex(this.tabla).insert(elem);
    }

    async close() {
        await this.knex.destroy();
    }
}

module.exports = ContenedorSQL;