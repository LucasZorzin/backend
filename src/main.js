const express = require('express');
const fs = require('fs');

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

// Listado Productos
app.use(express.static('../public'));

app.get('/', (req, res) => {
    res.sendFile('../index.html', { root: __dirname });
})


////! Database !////

//! Config
const config = require("../options/config");
//!

//! Contendores
const ContenedorSQL = require("../contenedores/contenedorSQL");
const ContenedorMongoDb = require("../contenedores/contenedorMongoDb");
const ContenedorFirebase = require("../contenedores/contenedorFirebase");
//!


// ----------Descomentar el tipo de base de datos que se quiera utilizar: ----------
// (Por defecto dejé Firebase para los productos y Mongoose para los mensajes)

//! Mensajes SQLITE3:
// const messagesApi = new ContenedorSQL(config.sqlite3, "mensajes");
//!Mensajes MongoDB:
// const messagesApi = new ContenedorMongoDb(config.mongooseMensajes,"mensajes");
//! Productos Firebase:
const messagesApi = new ContenedorFirebase(config.firebase,"mensajes");


//! Productos MariaDB:
// const productsApi = new ContenedorSQL(config.mariaDb, "productos");
//! Productos MongoDB:
// const productsApi = new ContenedorMongoDb(config.mongooseProductos,"productos");
//! Productos Firebase:
const productsApi = new ContenedorFirebase(config.firebase,"productos");

// ----------------------------------------------------------------------------------



//! MENSAJES
// Envío por primera vez a la base de datos:
// const messages = [{ "author": "bot-vendedor@demo.com", "text": "Hola! Puedo ayudarlo con algo?", "date": "19/4/22, 14:03" }, { "author": "comprador@gmail.com", "text": "Si, por favor necesito...", "date": "19/4/22, 14:07" }];
const messages = [];
const mensajeAnterior = async () => {
    try {
        // Si la longitud de messages == 0 es porque ya está en la base de datos (manualmente)
        if (messages.length == 0) {
            messages.push(await messagesApi.getAllM())
            // console.log(await messages[0])
        }
        else {
            // Creo por primera vez la Tabla
            await messagesApi.createTableMessages()
            // Guardo los mensajes por primera vez en la base de datos
            await messagesApi.save(messages)
        }

    }
    catch (error) {
        console.log(error);
    }
}
mensajeAnterior()


//! PRODUCTOS 
// Envío por primera vez a la base de datos:
// const products = require('../api/productos');
const products = [];
const productoAnterior = async () => {
    try {
        // Si la longitud de productos == 0 es porque ya está en la base de datos (manualmente)
        if (products.length == 0) {
            products.push(await productsApi.getAll())
            console.log(await products[0])
        }
        else {
            // Creo por primera vez la Tabla
            await productsApi.createTableProducts()
            // Guardo los productos por primera vez en la base de datos
            await productsApi.save(products)
            console.log(await productsApi.getAll())
        }

    }
    catch (error) {
        console.log(error);
    }
}
productoAnterior()


// IO
io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado.');
    socket.emit('products', products[0]);
    socket.on('new-product', product => {
        products[0].push(product);
        io.sockets.emit('products', products[0]);
        productsApi.save(product)
    })

    socket.emit('messages', messages[0]);
    socket.on('new-message', message => {
        messages[0].push(message);
        io.sockets.emit('messages', messages[0]);
        messagesApi.save(message);
        
    })
})

// Agrego middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Server
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
