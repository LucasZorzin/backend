const admin = require("firebase-admin");
const config = require("../options/config");

admin.initializeApp(config.firebase);

class ContenedorFirebase {
    constructor(userSchema, tabla) {
        this.tabla = tabla;
        this.db = admin.firestore();
        this.query = this.db.collection(tabla);
    }

    async createTableMessages() {
        console.log("Create");
    }

    async createTableProducts() {
        console.log("Create");
    }

    async getAll() {
        const querySnapshot = await this.query.get();
        let docs = querySnapshot.docs;
        const response = docs.map((doc) => ({
            title: doc.data().title,
            price: doc.data().price,
            thumbnail: doc.data().thumbnail
        }));
        return response;
    }

    async save(elem) {
        let doc = this.query.doc()
        return await doc.create(elem)
    }
}

module.exports = ContenedorFirebase;