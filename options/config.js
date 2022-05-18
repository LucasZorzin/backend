const admin = require("firebase-admin");
const serviceAccount = require("../DB/backend-coderhouse-cf169-firebase-adminsdk-pngtz-de0ec2e2cc.json");
const config = {
    sqlite3: {
        client: "sqlite3",
        connection: {
            filename: `../DB/ecommerce.sqlite`,
        },
        useNullAsDefault: true
    },
    mariaDb: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "productos"
        }
    },
    mongooseProductos: {
        title: String,
        price: Number,
        thumbnail: String
    },
    mongooseMensajes: {
        author: String,
        text: String,
        date: String
    },
    firebase: {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://backend-coderhouse-cf169.firebaseio.com'
    }
};
module.exports = config;