const mongoose = require("mongoose");
const URL = 'mongodb://localhost:27017/ecommerce';

class ContenedorMongoDb {
    constructor(userSchema, tabla) {
        this.tabla = tabla;
        this.userSchema = new mongoose.Schema(userSchema);
        this.model = mongoose.model(tabla, userSchema);
    }

    async createTableMessages() {
        //CREATE
        console.log("Create");
        const mSaveModel = new this.model(this.userSchema);
        let mSaved = await mSaveModel.save() // o .create()  es lo mismo;
        console.log(mSaved)
    }

    async createTableProducts() {
        //CREATE
        console.log("Create");
        const pSaveModel = new this.model(this.userSchema);
        let pSaved = await pSaveModel.save() // o .create()  es lo mismo;
        console.log(pSaved)
    }

    async getAll() {
        console.log("Base de datos conectada");
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // FIND
        console.log("READ ALL");
        let productos = await this.model.find({});
        console.log(productos);
        return productos;
    }

    async save(elem) {
        // INSERT 
        console.log("INSERT");
        let insert = await this.model.insertMany(elem);
        console.log(insert);
        return insert;
    }

    async close() {
        await mongoose.disconnect();
    }
}

module.exports = ContenedorMongoDb;